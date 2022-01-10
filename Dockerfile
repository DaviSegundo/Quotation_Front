FROM node:latest
LABEL Davi Segundo
EXPOSE 3000
COPY . /var/www
WORKDIR /var/www
RUN npm install 
RUN npm i --save-dev @types/styled-components
RUN npm install react-bootstrap bootstrap@5.1.3
ENTRYPOINT npm start