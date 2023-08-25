ARG NODE_VERSION=18-alpine3.17

FROM node:$NODE_VERSION
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ENV PNPM_HOME       "/usr/local/share/pnpm"
ENV PNPM_LOCAL      "/app/.pnpm-store"

ENV NPM_CACHE       "/root/.npm"

ENV PATH            "${PATH}:${PNPM_HOME}"

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@~7 && \
    pnpm config set store-dir ${PNPM_LOCAL} && \
    mkdir ${PNPM_HOME}

RUN pnpm install --shamefully-hoist
RUN pnpm install -g @quasar/cli

COPY . .

RUN if [ "$NODE_ENV" = "PROD" ]; then pnpm run build; fi

EXPOSE 9000
CMD if [ "$NODE_ENV" = "DEV" ]; then pnpm run dev; fi



