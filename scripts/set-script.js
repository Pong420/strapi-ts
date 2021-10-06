// @ts-check
// alias `npm set-script` command.
// As the command require minimal npm version 7 but node version is limited by strapi v3

const fs = require('fs/promises');

const [, , name] = process.argv;

async function run() {
  const content = await fs.readFile('package.json', 'utf-8');
  const package = JSON.parse(content);
  if (package.scripts && package.scripts[name]) {
    delete package.scripts[name];
    await fs.writeFile('package.json', JSON.stringify(package, null, 2));
  }
}

run().catch(console.error);
