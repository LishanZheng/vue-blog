FROM nginx

WORKDIR app
RUN npm install
RUN npm run build


COPY dist/  /usr/share/nginx/html/

EXPOSE 80
