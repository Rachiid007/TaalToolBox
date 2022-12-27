FROM node:16.17
WORKDIR /app
COPY . .
EXPOSE 3000
RUN npm ci && npm i -g typeorm ts-node && npm run build
CMD npm run typeorm migration:run && npm run start:prod

# FROM node:16.17
# WORKDIR /app
# ENV NODE_ENV=production
# COPY package*.json ./
# RUN npm ci && npm i -g typeorm ts-node
# COPY . .
# RUN npm run build
# EXPOSE 3000
# CMD npm run typeorm migration:run && node dist/src/main