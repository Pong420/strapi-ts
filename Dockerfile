# refrence:
# https://blog.logrocket.com/containerized-development-nestjs-docker/

FROM node:14.17.4-alpine as development

WORKDIR /srv/

COPY . .
COPY scripts/set-script.js ./

# Remove husky install since git is not existed in the image
RUN node set-script prepare ''
RUN node set-script preinstall ''
RUN yarn install --production=false --frozen-lockfile

# complie typescript to javascript in app directory
RUN yarn build

# build the strapi admin ui
ARG SERVER_URL=http://localhost:1337
ENV SERVER_URL=${SERVER_URL}

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN yarn app build

# ---------- break point ----------

FROM node:14.17.4-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /srv/

COPY package.json ./
COPY yarn.lock ./
COPY scripts/set-script.js ./

# Just copy the app directory and install the dependencies seems a good idea
# But I am afraid that the lock file will not work. So We keep the yarn workspaces structure
COPY --from=development /srv/app ./app

RUN node set-script prepare ''
RUN node set-script preinstall ''
RUN yarn install --production=true --frozen-lockfile

# reduce node_modules size
COPY scripts/trim-node-modules.sh ./
RUN ["chmod", "+x", "./trim-node-modules.sh"]
RUN ./trim-node-modules.sh
RUN rm -rf app/jest.*
RUN rm -rf app/tests

# install node-prune (https://github.com/tj/node-prune)
RUN apk --no-cache add curl bash
RUN npx node-prune
RUN npx node-prune app/node_modules

# "yarn install --production=true" does not install "mongoose/node_modules/mongodb"
# But this is required for import { MongoError } from "mongoose/node_modules/mongodb"
RUN mkdir $PWD/node_modules/mongoose/node_modules
RUN cp -r $PWD/node_modules/mongodb $PWD/node_modules/mongoose/node_modules

WORKDIR /srv/app

EXPOSE 1337

CMD ["yarn", "start"]