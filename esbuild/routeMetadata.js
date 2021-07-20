// @ts-check
const fs = require('fs/promises');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { uniqBy } = require('lodash');

/**
 * @typedef {{ method: string, path: string, handler: string, config: { policies: string[], prefix?: '' } }} RouteMetadata
 */

/**
 * @param {string} name
 * @param {string} content
 */
function parseRouteMetadata(name, content) {
  const ast = parser.parse(content, {
    allowImportExportEverywhere: true,
    plugins: ['typescript', 'decorators-legacy']
  });

  /** @type {RouteMetadata[]} */
  const metadata = [];
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

      /** @type {string[]} */
      const policies = [];
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
          case 'Polices':
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

/**
 * @type {import('esbuild').Plugin}
 */
const genRouteMetadata = {
  name: 'generate-route-metadata',
  setup(build) {
    /** @type {(import('esbuild').OutputFile)[]} */
    const files = [];

    build.onResolve({ filter: /\/controllers\/.*.ts/ }, async result => {
      const content = await fs.readFile(result.path, 'utf-8');
      const metadata = parseRouteMetadata(
        path.basename(result.path).slice(0, -3),
        content
      );

      const jsonPath = path.resolve(
        result.resolveDir,
        result.path.split('/').slice(1, -2).join('/'),
        'config/routes.json'
      );

      /** @type {{ routes: RouteMetadata[] }} */
      const defaultMetata = await fs
        .readFile(jsonPath, 'utf-8')
        .catch(() => JSON.stringify({ routes: [] }))
        .then(text => JSON.parse(text));

      const outpath = path.join(
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

      return {};
    });

    build.onEnd(result => {
      result.outputFiles = result.outputFiles || [];
      result.outputFiles.push(...files);
    });
  }
};

module.exports = { genRouteMetadata };
