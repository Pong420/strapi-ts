// @ts-check
const fs = require('fs');

/**
 * remove the `app/package.json`, make sure old packages will not be installed
 */
const files = ['app/package.json'];

for (const file of files) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}

/** @type {import('../strapi/package.json') | undefined} */
let strapiPkg;

try {
  strapiPkg = require('../strapi/package.json');
} catch {
  // error if using docker
}

if (strapiPkg) {
  const deps = { ...strapiPkg.dependencies, ...strapiPkg.devDependencies };
  if (
    deps['jest'] !== '~26.6.3' ||
    deps['jest-circus'] !== '~26.6.3' ||
    deps['@types/jest'] !== '27.0.1'
  ) {
    throw new Error(
      'Do not upgrade the jest packages. Since strapi limits the node version and the version is not supported by jest above 26'
    );
  }

  if (deps['@types/pino'] !== '4.7.1') {
    throw new Error(
      'Do not upgrade the "@types/pino". Since the higher version is not compatible with strapi v3.'
    );
  }
}
