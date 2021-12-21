#!/usr/bin/env zx

require('../zx');

void (async () => {
  const { docker } = argv;
  if (docker) {
    await $`docker-compose exec -T mongo sh -c "mongo strapi --username=strapi --password=strapi --authenticationDatabase admin --eval 'db.dropDatabase()'"`;
  } else {
    await $`mongo strapi --eval 'db.dropDatabase()'`;
  }
})();
