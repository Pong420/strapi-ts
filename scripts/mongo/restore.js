#!/usr/bin/env zx

require('../zx');

void (async () => {
  const {
    docker,
    _: [$1]
  } = argv;

  if (docker) {
    const name = $1 || 'db';
    await $`docker-compose exec -T mongo sh -c 'mongorestore --username=strapi --password=strapi --db=strapi --authenticationDatabase admin --archive' < ${name}.dump`;
  } else {
    const uri = 'mongodb://localhost:27017/strapi';
    const name = $1 || path.basename(uri.replace(/\?.*/, ''));
    await $`mongorestore --uri=${uri} --drop --archive < ${name}.dump`;
  }
})();
