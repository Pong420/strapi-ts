// @ts-check
const { addHook } = require('pirates');
const { transformSync } = require('esbuild');

// /**
//  * @param {string} filename
//  */
// function matcher(filename) {
//   // Here, you can inspect the filename to determine if it should be hooked or
//   // not. Just return a truthy/falsey. Files in node_modules are automatically ignored,
//   // unless otherwise specified in options (see below).

//   // TODO: Implement your logic here
//   return true;
// }

addHook(
  code => {
    const result = transformSync(code, {
      loader: 'ts',
      format: 'cjs',
      target: 'node12'
    });
    if (result.warnings.length) {
      throw new Error(JSON.stringify(result.warnings));
    }
    return result.code;
  },
  {
    exts: ['.ts']
    // matcher
  }
);
