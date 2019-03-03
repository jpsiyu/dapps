FROM node:10

WORKDIR /dapps

COPY . /dapps

RUN npm install

RUN npm install -g nodemon

EXPOSE 3006

CMD ["npm", "start"]