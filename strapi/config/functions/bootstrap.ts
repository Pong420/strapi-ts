import 'reflect-metadata';
import { setPermissions } from './permission';

const setAllPermissions = async () => {
  setPermissions({
    public: {
      application: {
        category: ['find', 'findone'],
        product: ['find', 'findone']
      },
      'users-permissions': {
        auth: ['register', 'callback', 'connect']
      }
    },
    authenticated: {
      application: {
        category: ['find', 'findone'],
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

  // FIXME:
  // Review isFirstRun checking
  try {
    if (shouldSetConfig || process.env.NODE_ENV !== 'test') {
      await setAllPermissions();
    }
    console.log('Setting up your starter...'); // eslint-disable-line
    console.log('Ready to go'); // eslint-disable-line
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
};
