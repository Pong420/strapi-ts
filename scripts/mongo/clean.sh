#!/bin/sh
docker-compose exec -T mongo sh -c "mongo strapi --username=strapi --password=strapi --authenticationDatabase admin --eval 'db.dropDatabase()'"