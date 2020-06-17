FROM node:13.14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npx", "ts-node", "src/server.ts" ]
