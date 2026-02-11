# syntax=docker/dockerfile:1

ARG NODE_VERSION=25.0.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /server

COPY package*.json ./

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

COPY . .

RUN chown -R node:node /server

RUN ls -la && \
  echo "=== Checking for server.js ===" && \
  find . -name "server.js" -o -name "*.js" | head -20

USER node

EXPOSE 5000

CMD ["node", "server.js"]