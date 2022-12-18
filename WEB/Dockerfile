FROM node:16.17 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# create bind volume for certificates and keys
# VOLUME ../certbot/:/etc/nginx/ssl/
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]