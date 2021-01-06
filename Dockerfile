FROM node:10.23-alpine
RUN npm install
RUN npm run build

FROM nginx
COPY dist/  /usr/share/nginx/html/

EXPOSE 80
