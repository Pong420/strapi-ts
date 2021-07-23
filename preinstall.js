const fs = require('fs');

/**
 * remove the `app/package.json`, make sure old packages will not be installed
 */
const files = ['app/package.json'];

for (const file of files) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}
