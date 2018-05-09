FROM node:9.11.1

RUN mkdir -p /home/liveApp

WORKDIR /home/liveApp

COPY package.json /home/liveApp

RUN npm install --production --registry=https://registry.npm.taobao.org

COPY . /home/liveApp

EXPOSE 7001
# 就在 docker 里面跑 egg-scripts start 即可，不需要 --daemon 了。
CMD npm run docker