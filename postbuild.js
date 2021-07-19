// @ts-check
const fs = require('fs');
const path = require('path');

/**
 * @param {string} source
 * @param {string} traget
 */
function copy(source, traget) {
  const files = fs.readdirSync(source);
  let basename = path.basename(source);
  basename = basename === source ? '' : basename;
  const targetFolder = path.join(traget, basename);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(targetFolder, file);
    const stat = fs.lstatSync(sourcePath);

    if (stat.isDirectory()) {
      if (file.includes('node_modules')) continue;
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
      }
      copy(sourcePath, targetFolder);
    } else {
      if (!['.ts'].includes(path.extname(file)) && !file.includes('eslint')) {
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
  }
}

copy('strapi', 'app');

const packageJSONPath = 'app/package.json';
const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf-8'));
packageJSON.name = '@strapi-ts/app';
fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));
