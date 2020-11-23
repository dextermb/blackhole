FROM node:current-slim AS BUILD_IMAGE
WORKDIR /usr/src/app

ENV NODE_ENV production

COPY package.json yarn.lock ./
RUN NOYARNPOSTINSTALL=1 yarn --frozen-lockfile

COPY . .
RUN yarn run web:build

FROM node:current-slim
WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/app/.next ./.next

COPY package.json boot.js ./
COPY hooks/mail/ ./hooks/mail
COPY utilities ./utilities
COPY servers ./servers

EXPOSE 80
EXPOSE 25

CMD ["yarn", "run", "boot"]
