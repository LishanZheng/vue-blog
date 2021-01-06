FROM 10.23-stretch
RUN npm install
RUN npm run build

FROM nginx
COPY dist/  /usr/share/nginx/html/

EXPOSE 80
