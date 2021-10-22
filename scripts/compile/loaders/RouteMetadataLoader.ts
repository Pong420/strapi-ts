import fs from 'fs/promises';
import path from 'path';
import traverse from '@babel/traverse';
import { camelCase } from 'lodash';
import { parse } from '@babel/parser';
import { Method, TSType } from '@babel/types';
import { uniqBy } from 'lodash';
import { formatTs } from '../../prettier';
import { Loader } from '../loader';
import { srcDir } from '../../constants';

interface RouteMetadata {
  method: string;
  path: string;
  handler: string;
  config: { policies: string[]; prefix?: string };
  payload?: string | string[];
}

type RouteMapMeta = Pick<RouteMetadata, 'method' | 'path'>;

function getTypeName(typeAnnotation: TSType) {
  if (typeAnnotation?.type !== 'TSTypeReference') return;
  if (typeAnnotation.typeName.type !== 'Identifier') return;
  if (!typeAnnotation.typeParameters) return;
  if (!/Koa.*Context/.test(typeAnnotation.typeName.name)) {
    return;
  }

  const tsType = typeAnnotation.typeParameters.params[0];

  if (tsType.type !== 'TSTypeReference') return;
  if (tsType.typeName.type !== 'Identifier') return;

  return tsType.typeName.name;
}

function getRequestPayload(params?: Method['params'][number]) {
  if (params?.type !== 'Identifier') return;
  if (!params.typeAnnotation) return;
  if (params.typeAnnotation.type !== 'TSTypeAnnotation') return;

  const { typeAnnotation } = params.typeAnnotation;

  if (typeAnnotation.type === 'TSUnionType') {
    return typeAnnotation.types.map(getTypeName);
  }

  return getTypeName(typeAnnotation);
}

function parseRouteMetadata(name: string, content: string) {
  const ast = parse(content, {
    allowImportExportEverywhere: true,
    plugins: ['typescript', 'decorators-legacy']
  });

  const metadata: RouteMetadata[] = [];
  let prefix = '';

  traverse(ast, {
    ClassDeclaration(nodePath) {
      if (!nodePath.node.decorators) return;
      for (const d of nodePath.node.decorators) {
        if (d.expression.type !== 'CallExpression') continue;
        if (d.expression.callee.type !== 'Identifier') continue;
        switch (d.expression.callee.name) {
          case 'Controller':
            prefix =
              d.expression.arguments[0].type === 'StringLiteral'
                ? d.expression.arguments[0].value
                : '';
            break;
        }
      }
    },
    ClassMethod(nodePath) {
      if (nodePath.node.key.type !== 'Identifier') return;
      if (!nodePath.node.decorators) return;

      const policies: string[] = [];
      let method = '';
      let path = prefix.startsWith('/') ? prefix : `/${prefix}`;
      let payload;

      for (const d of nodePath.node.decorators) {
        if (d.expression.type !== 'CallExpression') continue;
        if (d.expression.callee.type !== 'Identifier') continue;
        switch (d.expression.callee.name) {
          case 'Get':
          case 'Put':
          case 'Post':
          case 'Patch':
          case 'Delete':
            method = d.expression.callee.name.toUpperCase();
            path += '/';
            path +=
              d.expression.arguments[0].type === 'StringLiteral'
                ? d.expression.arguments[0].value
                : '';
            path = path.replace(/(\/+)/g, '/');
            path = path.replace(/\/$/g, '');
            payload = getRequestPayload(nodePath.node.params[0]);
            break;
          case 'Policies':
            for (const arg of d.expression.arguments) {
              if (arg.type !== 'ArrayExpression') continue;
              for (const el of arg.elements) {
                if (!el || el.type !== 'StringLiteral') continue;
                policies.push(el.value);
              }
            }
            break;
        }
      }

      if (!method || !path) return;

      metadata.push({
        method,
        path,
        payload,
        handler: `${name}.${nodePath.node.key.name}`,
        config: {
          policies
        }
      });
    }
  });

  return metadata;
}

let routeMap: Record<string, Record<string, RouteMapMeta>> = {};

export class RouteMetadataLoader extends Loader {
  static routeMapPath = 'tests/helpers/routes.ts';

  patterns = ['**/controllers/*.ts', '**/routes.json'];

  getName(filepath: string) {
    return path.basename(filepath).slice(0, -path.extname(filepath));
  }

  getRouteMapKey(name: string) {
    return camelCase(name);
  }

  async use(files: string[]) {
    const routeJSONs: Record<string, RouteMapMeta[]> = {};

    const groups = files.map(sourcePath => {
      return sourcePath.split('/').slice(0, -2).join('/');
    });

    for (const group of groups) {
      const controllers = await fs.readdir(
        path.join(srcDir, group, 'controllers')
      );
      const jsonPath = path.join(srcDir, group, 'config/routes.json');
      const defaultMetata: { routes: RouteMetadata[] } = await fs
        .readFile(jsonPath, 'utf-8')
        .then(text => JSON.parse(text))
        .catch(() => ({ routes: [] }));
      const outJsonPath = path.join(group, 'config/routes.json');

      const parseControllers = controllers.map(async filename => {
        const contents = await fs.readFile(
          path.join(srcDir, group, 'controllers', filename),
          'utf-8'
        );
        const name = path.basename(filename).slice(0, -3);
        const metadata = uniqBy(
          // metadata should before the default routes
          [
            ...parseRouteMetadata(name, contents),
            // filter for route map classify
            ...defaultMetata.routes.filter(({ handler }) =>
              handler.startsWith(name)
            )
          ],
          x => `${x.method}_${x.path}`
        );

        if (outJsonPath.includes('users-permissions')) {
          metadata.forEach(r => {
            r.config.prefix = '';
          });
        }

        routeMap[this.getRouteMapKey(name)] = metadata.reduce(
          (map, { handler, path, method }) => ({
            ...map,
            [handler.split('.')[1]]: { method, path }
          }),
          {} as Record<string, RouteMapMeta>
        );

        routeJSONs[outJsonPath] = routeJSONs[outJsonPath] || [];
        routeJSONs[outJsonPath].push(...metadata);
      });

      await Promise.all(parseControllers);
    }

    this.writeFileRouteMap();

    await Promise.all(
      Object.entries(routeJSONs).map(([outJsonPath, metadata]) =>
        this.writeFile(
          outJsonPath,
          JSON.stringify({ routes: metadata }, null, 2)
        )
      )
    );
  }

  onRemove(filename: string) {
    const name = this.getName(filename);
    const key = this.getRouteMapKey(name);
    const deleted = delete routeMap[key];
    if (deleted) {
      this.writeFileRouteMap();
    }
  }

  async writeFileRouteMap() {
    // fix the order
    routeMap = Object.keys(routeMap)
      .sort()
      .reduce(
        (map, key) => ({ ...map, [key]: routeMap[key] }),
        {} as typeof routeMap
      );

    await this.writeSourceFile(
      RouteMetadataLoader.routeMapPath,
      await formatTs(`export const routeMap = ${JSON.stringify(routeMap)}`)
    );
  }
}
