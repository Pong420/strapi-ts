// sync MongoError
// https://github.com/nodkz/mongodb-memory-server/issues/78
//
// Since the path `strapi-connector-mongoose/node_modules/mongodb` cannot be found in production
// So we need dynamic import to load the mongodb module

const mongodb =
  process.env.NODE_ENV === 'production'
    ? require('mongoose')
    : require('strapi-connector-mongoose/node_modules/mongodb');

module.exports = mongodb;
