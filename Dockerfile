FROM node:10.23-alpine

WORKDIR app
COPY . app/
RUN npm install
RUN npm run build

FROM nginx
COPY dist/  /usr/share/nginx/html/

EXPOSE 80
