FROM node:8.11.1-alpine

RUN mkdir -p /usr/local/liveApp

WORKDIR /usr/local/liveApp

COPY package.json /usr/local/liveApp

RUN npm i 

COPY . /usr/local/liveApp

EXPOSE 7001

CMD npm run start