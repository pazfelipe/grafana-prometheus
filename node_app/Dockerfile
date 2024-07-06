FROM node:22-alpine

WORKDIR /opt/app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3001

CMD [ "yarn", "start" ]