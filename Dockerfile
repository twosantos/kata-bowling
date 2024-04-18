FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i && npm i typescript -g

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/src/app" ]