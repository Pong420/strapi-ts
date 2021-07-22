import fs from 'fs/promises';
import { basename, resolve, join } from 'path';
import { uniqBy } from 'lodash';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { formatTs } from '../scripts/prettier';
import type { Plugin, OutputFile } from 'esbuild';

interface RouteMetadata {
  method: string;
  path: string;
  handler: string;
  config: { policies: string[]; prefix?: string };
}

interface GenRouteMetadata {
  routeMapPath: string;
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

export const genRouteMetadata = ({ routeMapPath }: GenRouteMetadata) => {
  const plugin: Plugin = {
    name: 'generate-route-metadata',
    setup(build) {
      const files: OutputFile[] = [];
      const routeMap: Record<string, Record<string, RouteMapMeta>> = {};

      build.onResolve({ filter: /\/controllers\/.*.ts/ }, async result => {
        const content = await fs.readFile(result.path, 'utf-8');
        const name = basename(result.path).slice(0, -3);
        const metadata = parseRouteMetadata(name, content);

        const jsonPath = resolve(
          result.resolveDir,
          result.path.split('/').slice(1, -2).join('/'),
          'config/routes.json'
        );

        const defaultMetata: { routes: RouteMetadata[] } = await fs
          .readFile(jsonPath, 'utf-8')
          .catch(() => JSON.stringify({ routes: [] }))
          .then(text => JSON.parse(text));

        const outpath = join(
          result.resolveDir,
          build.initialOptions.outdir || '',
          result.path.split('/').slice(2, -2).join('/'),
          'config/routes.json'
        );

        const routes = uniqBy(
          // metadata should before the default routes
          [...metadata, ...defaultMetata.routes],
          x => `${x.method}_${x.path}`
        );
        const contents = JSON.stringify({ routes }, null, 2);

        files.push({
          path: outpath,
          text: contents,
          contents: Buffer.from(contents)
        });

        routeMap[name.toLowerCase()] = routes.reduce(
          (map, { handler, path, method }) => ({
            ...map,
            [handler.split('.')[1]]: { method, path }
          }),
          {} as Record<string, RouteMapMeta>
        );

        return {};
      });

      build.onEnd(async result => {
        result.outputFiles = result.outputFiles || [];
        result.outputFiles.push(...files);

        await fs.writeFile(
          resolve(__dirname, '..', routeMapPath),
          await formatTs(`export const routeMap = ${JSON.stringify(routeMap)}`)
        );
      });
    }
  };

  return plugin;
};
