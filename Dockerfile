FROM node:10.23-alpine AS BUILDER

ENV MY_HOME=/root
RUN mkdir -p $MY_HOME
WORKDIR $MY_HOME
ADD package.json $MY_HOME
RUN npm config set registry http://registry.npm.taobao.org/ && npm install
ADD . $MY_HOME
RUN npm run build

FROM nginx
COPY --from=BUILDER /root/dist/  /usr/share/nginx/html/

EXPOSE 80

