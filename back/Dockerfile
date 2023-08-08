ARG NODE_VERSION=18-alpine3.17

FROM node:$NODE_VERSION as base

WORKDIR /app

COPY package*.json ./

EXPOSE 8082

# FROM base as production
# ENV NODE_ENV=production
# RUN npm ci 
# COPY ./ ./ 
# CMD ["node", "app"] 

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY ./ ./ 
CMD ["nodemon", "./server.js"]
