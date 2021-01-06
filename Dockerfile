FROM node:10.23-alpine AS BUILDER

COPY . .
RUN npm install
RUN npm run build

FROM nginx
COPY --from=BUILDER dist/  /usr/share/nginx/html/

EXPOSE 80

