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

if (strapiPkg) {
  const deps = { ...strapiPkg.dependencies, ...strapiPkg.devDependencies };
  if (
    deps['jest'] !== '~26.6.3' ||
    deps['jest-circus'] !== '~26.6.3' ||
    deps['@types/jest'] !== '27.0.2'
  ) {
    throw new Error(
      'Do not upgrade the jest packages. Since strapi limits the node version and the version is not supported by jest above 26'
    );
  }

  if (deps['@types/pino'] !== '4.7.1') {
    throw new Error(
      'Do not upgrade "@types/pino". Since the higher version is not compatible with strapi v3.'
    );
  }

  if (!/5\.\d+\.\d+/.test(deps['mongoose'])) {
    throw new Error(
      'Do not upgrade "mongoose" version to 6. Since the types of mongoose is difference in v6 but strapi is using mongoose version "5.10.8"'
    );
  }

  if (deps['react']) {
    throw new Error(
      'Do not install react yourself. Since it may conflict with strapi v3'
    );
  }
}
