FROM node:15.2.1-buster

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3000
CMD npm run start

