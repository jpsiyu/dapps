FROM node:10

WORKDIR /dapps

COPY . /dapps

RUN npm install

RUN npm install -g nodemon

EXPOSE 80

CMD ["npm", "start"]