import { Model } from 'strapi';
import { IRole } from '@/typings';

const cache = new Map<string, Model<IRole>>();

export function cacheRoleQuery() {
  const roleQuery = strapi.query('role', 'users-permissions');

  const findOne = roleQuery.findOne;
  roleQuery.findOne = async function (params, populate) {
    const key = params.type || params.id || '';
    let role = cache.get(key);
    if (!role) {
      role = await findOne.call(this, params, populate);
      cache.set(key, role);
    }
    return role;
  };

  /**
   * For change role permission in production environment ?
   */
  const update = roleQuery.update;
  roleQuery.update = function (params, payload) {
    cache.clear();
    return update.call(this, params, payload);
  };
}
