FROM node:20

ADD package.json /tmp/package.json

ADD yarn.lock /tmp/yarn.lock

RUN rm -rf build

RUN cd /tmp && yarn install

ADD ./ /src

ADD ./prisma /src/prisma

RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/

WORKDIR /src

RUN npx prisma generate

RUN yarn build

EXPOSE 3000

CMD ["node", "build/src/app.js"]