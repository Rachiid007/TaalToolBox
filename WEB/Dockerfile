FROM node:16.17 as build-stage
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx as production-stage
RUN apt update && apt install -y nano
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]