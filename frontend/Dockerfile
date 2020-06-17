FROM node:13.14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN NODE_ENV=production npx snowpack install && NODE_ENV=production npx snowpack build

EXPOSE 5000

CMD [ "npx", "serve", "-l", "5000", "-s", "build" ]
