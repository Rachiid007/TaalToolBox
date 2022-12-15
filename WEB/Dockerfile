# vue.3 app with docker and create nginx image
# docker build -t vue3-app .
# docker run -d -p 80:80 --name vue3-app vue3-app
# docker exec -it vue3-app /bin/sh

FROM node:16.17-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]