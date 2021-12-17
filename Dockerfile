# refrence:
# https://blog.logrocket.com/containerized-development-nestjs-docker/

FROM node:14.17.4-alpine as development

WORKDIR /srv/

COPY . .
COPY scripts/*.js ./scripts/

# Remove husky install since git is not existed in the image
RUN node scripts/set-script prepare ''
RUN yarn install --production=false --frozen-lockfile

# build the strapi admin ui
ARG SERVER_URL=http://localhost:1337
ENV SERVER_URL=${SERVER_URL}

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# complie typescript to javascript in app directory
RUN yarn build

# run strapi build process
RUN yarn app build

# -------------------- break point --------------------

FROM node:14.17.4-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /srv/

COPY package.json ./
COPY yarn.lock ./
COPY scripts/*.js ./scripts/

# Just copy the app directory and install the dependencies seems a good idea
# But I am afraid that the lock file will not work. So We keep the yarn workspaces structure
COPY --from=development /srv/app ./app

RUN node scripts/set-script prepare ''
RUN yarn install --production=true --frozen-lockfile

# reduce node_modules size
# COPY scripts/trim-node-modules.sh ./
# RUN ["chmod", "+x", "./trim-node-modules.sh"]
# RUN sh ./trim-node-modules.sh
RUN rm -rf app/jest.*
RUN rm -rf app/tests

# make sure enviroment variables file not public
RUN find app/public -name ".*env*"  -exec rm -rf {} +

# install node-prune (https://github.com/tj/node-prune)
RUN apk --no-cache add curl bash
RUN npx node-prune
RUN npx node-prune app/node_modules

WORKDIR /srv/app

EXPOSE 1337

CMD ["yarn", "start"]