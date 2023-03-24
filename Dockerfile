FROM node:18.13.0-alpine as development

ENV NODE_ENV development

WORKDIR ./react_typescript_taskmania

COPY ./ ./

COPY ./package.json ./
COPY ./package-lock.json ./

RUN yarn install

CMD [ "npm", "start" ]

