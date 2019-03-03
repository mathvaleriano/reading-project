FROM node:11.10.1-alpine as client

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -qy

COPY . .

EXPOSE 8080

CMD ["npm", "start"]