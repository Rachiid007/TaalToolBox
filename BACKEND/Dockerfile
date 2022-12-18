FROM node:16.17
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm i -g typeorm ts-node
COPY . .
EXPOSE 3000
RUN npm run build
CMD ["node", "dist/src/main"]