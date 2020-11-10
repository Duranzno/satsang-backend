# Fermium
FROM node:14.15.0-buster as base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN yarn install
CMD ["yarn", "dev"]
