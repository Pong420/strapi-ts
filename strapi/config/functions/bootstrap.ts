import 'reflect-metadata';
import { setPermissions } from './permission';

const setAnonymousPermissions = async () => {
  await setPermissions('public', 'application', p => {
    switch (p.controller) {
      case 'category':
        return ['find', 'findone'];
      default:
        return [];
    }
  });

  await setPermissions('public', 'users-permissions', p => {
    switch (p.controller) {
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
    // if (shouldSetConfig || process.env.NODE_ENV !== 'test') {
    await setAnonymousPermissions();
    // }

    console.log('Setting up your starter...'); // eslint-disable-line
    console.log('Ready to go'); // eslint-disable-line
  } catch (e) {
    console.log(e); // eslint-disable-line
  }
};
