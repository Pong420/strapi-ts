const fs = require('fs');
const path = require('path');

/**
 * https://stackoverflow.com/questions/13786160/copy-folder-recursively-in-node-js
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
const copySync = function (src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(function (childItemName) {
      copySync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

module.exports = { copySync };
