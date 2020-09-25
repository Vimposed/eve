FROM node:lts-alpine

RUN npm install
COPY . /app
WORKDIR /app

RUN npm run build

ENTRYPOINT ["npm", "run", "prod"]
