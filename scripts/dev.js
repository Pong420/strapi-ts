require('zx/globals');

process.env.FORCE_COLOR = '3';

void (async function () {
  /**
   * @param {() => Promise<void>} fn
   * @returns {() => Promise<void>}
   */
  const run = fn => {
    return async () => {
      try {
        await fn();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(chalk.redBright(error['stderr']));
        await fn();
      }
    };
  };

  const compile = run(() => $`yarn build --watch`);
  const develop = run(() => $`yarn app develop ${process.argv.slice(2)}`);

  await $`yarn build`;
  await Promise.all([compile(), develop()]);
})();
