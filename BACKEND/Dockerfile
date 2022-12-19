FROM node:16.17
WORKDIR /app
COPY . .
EXPOSE 3000
RUN npm ci && npm i -g typeorm ts-node && npm run build
CMD npm run typeorm migration:run && npm run start:prod