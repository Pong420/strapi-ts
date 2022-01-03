// sync MongoError
// https://github.com/nodkz/mongodb-memory-server/issues/78
declare module 'strapi-connector-mongoose/node_modules/mongodb' {
  export * from 'mongodb';
}

export * from 'mongodb';
