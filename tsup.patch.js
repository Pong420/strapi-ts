// @ts-check

const fs = require('fs');
const path = require('path');

const fullPath = path.resolve(__dirname, `node_modules/tsup/dist/index.js`);
const content = fs.readFileSync(fullPath, 'utf-8');

fs.writeFileSync(fullPath, content.replace(`bundle: true`, `bundle: false`));
