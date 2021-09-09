FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

EXPOSE $SERVER_PORT

CMD ["npm", "start"]