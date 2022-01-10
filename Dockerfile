FROM node:latest
LABEL Davi Segundo
EXPOSE 3000
COPY . /var/www
WORKDIR /var/www
RUN npm install 
ENTRYPOINT npm start