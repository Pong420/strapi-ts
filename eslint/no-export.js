// @ts-check
/**
 * @typedef {import('eslint')}
 */

const description = `cannot not use "export" in this file since "module.exports" is used`;

/** @type {import('eslint').Rule.RuleModule} */
const noExport = {
  meta: {
    type: 'problem',

    docs: {
      description,
      recommended: true,
      url: './eslint/no-export.js'
    },

    schema: [],

    messages: {
      unexpected: description
    }
  },
  create(context) {
    return {
      ExportNamedDeclaration(node) {
        const regex =
          /\/(api|extensions)\/.*\/(controllers|config|services|models)/;

        if (
          context.getFilename().match(regex) &&
          node.declaration &&
          [
            'ClassDeclaration',
            'FunctionDeclaration',
            'VariableDeclaration'
          ].includes(node.declaration.type)
        ) {
          context.report({
            node,
            messageId: 'unexpected'
          });
        }
      }
    };
  }
};

module.exports = { 'no-export': noExport };
