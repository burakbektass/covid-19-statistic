
FROM node:18.17.0

WORKDIR /redux-with-saga

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
