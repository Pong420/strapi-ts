import { sanitizeEntity } from 'strapi-utils';

module.exports = {
  async findOne(ctx: any) {
    const { slug } = ctx.params;
    const entity = await strapi.services.product.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.product });
  },
};
