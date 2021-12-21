require('zx/globals');

process.env.FORCE_COLOR = '3';

void (async function () {
  const compile = async () => {
    try {
      await $`yarn build --watch`;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error['stderr']);
      await compile();
    }
  };

  const develop = async () => {
    try {
      await $`yarn app develop ${process.argv.slice(2)}`;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error['stderr']);
      await develop();
    }
  };

  await $`yarn build`;
  await Promise.all([compile(), develop()]);
})();
