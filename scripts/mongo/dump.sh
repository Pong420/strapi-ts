#!/bin/sh
docker-compose exec -T mongo sh -c 'mongodump --username=strapi --password=strapi --db=strapi --authenticationDatabase admin --archive' > ${1:-db}.dump