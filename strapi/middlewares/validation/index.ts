module.exports = (strapi: any) => {
  return {
    // can also be async
    initialize() {
      strapi.app.use(async (ctx: any, next: any) => {
        await next();
      });
    }
  };
};
