ARG NODE_VERSION=18-alpine3.17

FROM node:$NODE_VERSION
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

COPY package*.json ./

EXPOSE 8082

RUN if [ "$NODE_ENV" = "PROD" ]; then npm ci; else npm install; fi
RUN npm install pm2 -g

COPY ./ ./

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
