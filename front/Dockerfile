ARG NODE_VERSION=18-alpine3.17

FROM node:$NODE_VERSION

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

EXPOSE 3000

CMD ["pnpm", "run", "dev"]

