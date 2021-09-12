import { setPermissions } from './permission';
import { cacheRoleQuery } from './patches/cacheRoleQuery';
import { contentTypeBuilderPatch } from './patches/contentTypeBuilderPatch';

const setAllPermissions = async () => {
  setPermissions({
    common: {
      application: {
        category: ['find', 'findone']
      }
    },
    public: {
      application: {
        product: ['find', 'findone']
      },
      'users-permissions': {
        auth: ['register', 'callback', 'connect']
      }
    },
    authenticated: {
      application: {
        product: ['find', 'findone', 'update', 'delete']
      },
      'users-permissions': {}
    }
  });
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
  const shouldSetConfig = await isFirstRun();

  try {
    cacheRoleQuery();

    if (shouldSetConfig || process.env.NODE_ENV === 'development') {
      await setAllPermissions();
    }

    if (process.env.NODE_ENV === 'development') {
      contentTypeBuilderPatch();
    }

    console.log('Setting up your starter...'); // eslint-disable-line
    console.log('Ready to go'); // eslint-disable-line
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
};
