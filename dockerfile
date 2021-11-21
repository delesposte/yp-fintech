FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./
RUN npm install
