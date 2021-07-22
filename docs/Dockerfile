FROM node:14.2.0-alpine as development

WORKDIR /usr/src/docs

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production=false

COPY . .

# RUN yarn build

# FROM node:14.2.0-alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package.json ./
# COPY yarn.lock ./

# RUN yarn install --production=true

# COPY . .

# COPY --from=development /usr/src/app/build ./build

CMD ["yarn", "serve", "--build"]