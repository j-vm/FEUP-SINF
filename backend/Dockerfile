FROM node:15.3.0-buster

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3000
CMD bash docker-entrypoint.sh
