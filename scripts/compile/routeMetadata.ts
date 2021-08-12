import fs from 'fs/promises';
import path from 'path';
import glob from 'globby';
import traverse from '@babel/traverse';
import { parse } from '@babel/parser';
import { uniqBy } from 'lodash';
import { watch, FSWatcher } from 'chokidar';
import { formatTs } from '../prettier';
import { srcDir, outDir } from '../constants';

interface Options {
  enableWatch: boolean;
  routeMapPath: string;
}

interface RouteMetadata {
  method: string;
  path: string;
  handler: string;
  config: { policies: string[]; prefix?: string };
}

type RouteMapMeta = Pick<RouteMetadata, 'method' | 'path'>;

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
    Method(nodePath) {
      if (nodePath.node.key.type !== 'Identifier') return;
      if (!nodePath.node.decorators) return;

      const policies: string[] = [];
      let method = '';
      let path = prefix.startsWith('/') ? prefix : `/${prefix}`;

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
const controllerPattern = '**/controllers/*.ts';
const watchPatterns = [controllerPattern, '**/config/routes.json'];
let watcher: FSWatcher;

export async function genRouteMetadata(options: Options) {
  const { enableWatch, routeMapPath } = options;

  const controllers = await glob(controllerPattern, { cwd: srcDir });
  const routeJSONs: Record<string, RouteMapMeta[]> = {};

  for (const filePath of controllers) {
    const content = await fs.readFile(path.join(srcDir, filePath), 'utf-8');
    const category = filePath.split('/').slice(0, -2).join('/');
    const name = path.basename(filePath).slice(0, -3);
    let metadata = parseRouteMetadata(name, content);

    const jsonPath = path.join(srcDir, category, 'config/routes.json');

    const defaultMetata: { routes: RouteMetadata[] } = await fs
      .readFile(jsonPath, 'utf-8')
      .catch(() => JSON.stringify({ routes: [] }))
      .then(text => JSON.parse(text));

    const outJsonPath = path.join(outDir, category, 'config/routes.json');

    metadata = uniqBy(
      // metadata should before the default routes
      [
        ...metadata,
        // filter for route map classify
        ...defaultMetata.routes.filter(({ handler }) =>
          handler.startsWith(name)
        )
      ],
      x => `${x.method}_${x.path}`
    );

    // i don't know why but required
    if (outJsonPath.includes('users-permissions')) {
      metadata.forEach(r => {
        r.config.prefix = '';
      });
    }

    routeMap[name.toLowerCase()] = metadata.reduce(
      (map, { handler, path, method }) => ({
        ...map,
        [handler.split('.')[1]]: { method, path }
      }),
      {} as Record<string, RouteMapMeta>
    );

    routeJSONs[outJsonPath] = routeJSONs[outJsonPath] || [];
    routeJSONs[outJsonPath].push(...metadata);
  }

  // fix the order
  routeMap = Object.keys(routeMap)
    .sort()
    .reduce(
      (map, key) => ({ ...map, [key]: routeMap[key] }),
      {} as typeof routeMap
    );

  await Promise.all(
    Object.entries(routeJSONs).map(async ([outJsonPath, metadata]) => {
      await fs.mkdir(path.dirname(outJsonPath), { recursive: true });
      await fs.writeFile(
        outJsonPath,
        JSON.stringify({ routes: metadata }, null, 2)
      );
    })
  );

  await fs.writeFile(
    path.resolve(srcDir, '..', routeMapPath),
    await formatTs(`export const routeMap = ${JSON.stringify(routeMap)}`)
  );

  if (enableWatch) {
    if (!watcher) {
      watcher = watch(watchPatterns, {
        ignored: ['**/node_modules'],
        ignoreInitial: true,
        cwd: srcDir
      });
    }

    watcher.removeAllListeners();
    watcher.on('all', () => genRouteMetadata(options));
  }
}
