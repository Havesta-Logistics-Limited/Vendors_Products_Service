FROM node:20-alpine

COPY package.* .

RUN npm install -g nodemon

WORKDIR /app

RUN npm install 

COPY . .

EXPOSE 60000

CMD ["npm", "run", "start"]