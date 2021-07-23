# refrence:
# https://blog.logrocket.com/containerized-development-nestjs-docker/

FROM node:14.2.0-alpine as development

WORKDIR /srv/

COPY package.json ./
COPY yarn.lock ./
COPY *.js ./

# `set-script` command require minimal npm version 7. 
# But node version is limited by strapi so cannot upgrade the node version
RUN npm install -g npm@7

# Remove husky install since git is not existed in the image
RUN npm set-script prepare ''
RUN yarn install --production=false 

COPY . .

RUN yarn build

# register workspace
RUN npm set-script preinstall ''
RUN yarn install --production=false 
# TODO: add NODE_ENV=production for production build ?
RUN yarn app build

FROM node:14.2.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /srv/

COPY package.json ./
COPY yarn.lock ./
COPY *.js ./

RUN npm install -g npm@7
RUN npm set-script prepare ''
RUN yarn install --production=true

COPY . .

COPY --from=development /srv/app/build ./app/build

WORKDIR /srv/app

CMD ["yarn", "start"]