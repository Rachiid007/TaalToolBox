FROM node:16.17 as build-stage

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm ci

ARG VITE_API_KEY
ENV VITE_API_KEY ${VITE_API_KEY}

# Bundle app source
COPY . .

RUN npm run build


FROM nginx as production-stage
RUN apt update && apt install -y nano
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]