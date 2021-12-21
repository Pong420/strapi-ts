#!/usr/bin/env zx

require('../zx');

void (async () => {
  const {
    docker,
    _: [$1]
  } = argv;

  if (docker) {
    const name = $1 || 'db';
    await $`docker-compose exec -T mongo sh -c 'mongodump --username=strapi --password=strapi --db=strapi --authenticationDatabase admin --archive' > ${name}.dump`;
  } else {
    const { env } = require('../env');
    const uri = env('DATABASE_URI');
    const name = $1 || path.basename(uri.replace(/\?.*/, ''));
    await $`mongodump --uri=${uri} --archive > ${name}.dump`;
  }
})();
