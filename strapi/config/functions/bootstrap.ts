import fs from 'fs';

const findPublicRole = async () => {
  const result = await strapi.query('role', 'users-permissions').findOne({
    type: 'public'
  });
  return result;
};

const setDefaultPermissions = async () => {
  const role = await findPublicRole();
  const permissions_applications = await strapi
    .query('permission', 'users-permissions')
    .find({
      type: 'application',
      role: role.id
    });
  await Promise.all(
    permissions_applications.map(p =>
      strapi.query('permission', 'users-permissions').update(
        {
          id: p.id
        },
        {
          enabled: true
        }
      )
    )
  );
};

const isFirstRun = async () => {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup'
  });
  const initHasRun = await pluginStore.get({
    key: 'initHasRun'
  });
  await pluginStore.set({
    key: 'initHasRun',
    value: true
  });
  return !initHasRun;
};

module.exports = async () => {
  const shouldSetDefaultPermissions = await isFirstRun();
  if (shouldSetDefaultPermissions) {
    try {
      console.log('Setting up your starter...');
      await setDefaultPermissions();
      console.log('Ready to go');
    } catch (e) {
      console.log(e);
    }
  }
};
