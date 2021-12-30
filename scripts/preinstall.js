const fs = require('fs');
const { copySync } = require('./copySync');

/** @type {import('../strapi/package.json') | undefined} */
let strapiPkg;

try {
  strapiPkg = require('../strapi/package.json');
  fs.mkdirSync('app', { recursive: true });
  fs.writeFileSync(
    'app/package.json',
    JSON.stringify(
      { ...strapiPkg, name: strapiPkg.name.replace(/\/.*/, '/app') },
      null,
      2
    )
  );
  copySync('strapi/providers', 'app/providers');
} catch (error) {
  // error if using docker
  // console.log(error);
}

let hasError = false;
const throwError = (...args) => {
  hasError = true;
  return console.error('\x1b[41m%s\x1b[0m', ' Error ', ...args);
};

if (strapiPkg) {
  const deps = { ...strapiPkg.dependencies, ...strapiPkg.devDependencies };
  if (
    deps['jest'] !== '~26.6.3' ||
    deps['jest-circus'] !== '~26.6.3' ||
    deps['@types/jest'] !== '27.0.2'
  ) {
    throwError(
      'Do not upgrade the jest packages. Since strapi limits the node version and the version is not supported by jest above 26'
    );
  }

  if (deps['@types/pino'] !== '4.7.1') {
    throwError(
      'Do not upgrade "@types/pino". Since the higher version is not compatible with strapi v3.'
    );
  }

  if (!/5\.\d+\.\d+/.test(deps['mongoose'])) {
    throwError(
      'Do not upgrade "mongoose" to v6 or above. The mongoose dependency aims as type checking. `strapi-connector-mongoose` fix the version to "5.10.8"'
    );
  }

  if (deps['react']) {
    throwError(
      'Do not install react yourself. Because it may conflict with strapi v3'
    );
  }

  if (hasError) {
    process.exit(1);
  }
}
