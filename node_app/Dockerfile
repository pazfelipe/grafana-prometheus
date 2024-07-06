FROM node:22-alpine

WORKDIR /opt/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN mkdir -p /opt/app/logs
RUN chmod -R 777 /opt/app/logs

EXPOSE 3001

CMD [ "yarn", "start" ]