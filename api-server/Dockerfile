FROM node:11.10.1-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -qy

COPY . .

EXPOSE 3001

CMD ["npm", "start"]