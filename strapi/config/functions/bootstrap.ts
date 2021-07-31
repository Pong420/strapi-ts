import 'reflect-metadata';
import { setPermissions } from './permission';

const setAnonymousPermissions = async () => {
  await setPermissions('public', 'application', p => {
    switch (p.controller) {
      case 'category':
        return ['find', 'findone'];
      case 'product':
        return ['find', 'findone'];
      default:
        return [];
    }
  });

  await setPermissions('public', 'users-permissions', p => {
    switch (p.controller) {
      case 'auth':
        return ['register', 'callback', 'connect'];
      default:
        return [];
    }
  });
};

const setAuthenticatedPermissions = async () => {
  await setPermissions('authenticated', 'application', p => {
    switch (p.controller) {
      case 'category':
        return ['find', 'findone'];
      case 'product':
        return ['find', 'findone', 'create', 'update', 'delete'];
      default:
        return [];
    }
  });

  await setPermissions('public', 'users-permissions', p => {
    switch (p.controller) {
      case 'auth':
        return ['register', 'callback', 'connect'];
      default:
        return [];
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
      await setAnonymousPermissions();
      await setAuthenticatedPermissions();
    }
    console.log('Setting up your starter...'); // eslint-disable-line
    console.log('Ready to go'); // eslint-disable-line
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
};
