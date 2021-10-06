# https://blog.vikfand.com/posts/serverless-strapi-tutorial/
#!/bin/bash

echo "trim-node-modules.sh"

du -hs node_modules/

find $PWD/node_modules -maxdepth 1 -type d -name "*react*" -exec rm -rf {} +
find $PWD/node_modules -type d -name "*webpack*" -exec rm -rf {} +
find $PWD/node_modules -type d -name "*proptypes*" -exec rm -rf {} +
find $PWD/node_modules -type d -name "*jquery*" -exec rm -rf {} +
find $PWD/node_modules -type d -name "*bootstrap*" -exec rm -rf {} +
find $PWD/node_modules -type f -name "*.css" -exec rm -rf {} +
find $PWD/node_modules -type f -name "*.jsx" -exec rm -rf {} + 
find $PWD/node_modules -type f -name "babel-plugin-*" -exec rm -rf {} +
find $PWD/node_modules -type f -name "fbjs*" -exec rm -rf {} + # draft-js dependencies
find $PWD/node_modules -type f -name "*-loader" -exec rm -rf {} +
find $PWD/node_modules -type f -name "css*" -exec rm -rf {} +
find $PWD/node_modules -type f -name "postcss*" -exec rm -rf {} +
rm -rf $PWD/node_modules/@strapi-ts/ # yarn workspace issues
rm -rf $PWD/node_modules/@babel/
rm -rf $PWD/node_modules/@types/
rm -rf $PWD/node_modules/@sentry/
rm -rf $PWD/node_modules/enhanced-resolve/ rm -rf $PWD/node_modules/memory-fs/ # webpack
rm -rf $PWD/node_modules/autoprefixer/
rm -rf $PWD/node_modules/font-awesome/ $PWD/node_modules/styled-components/ $PWD/node_modules/rxjs/ $PWD/node_modules/@formatjs/ $PWD/node_modules/codemirror/ $PWD/node_modules/core-js/ $PWD/node_modules/draft-js/ $PWD/node_modules/popper.js/
rm -rf $PWD/node_modules/bootstrap/ $PWD/node_modules/@buffetjs/ $PWD/node_modules/highlight.js/ $PWD/node_modules/@fortawesome/

du -hs node_modules/