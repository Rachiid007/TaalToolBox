FROM node:16.17-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
IF EXIST dist (
    COPY dist ./dist
)
# VOLUME ./dist:/app/dist