# Base image
FROM node:lts AS base

RUN apt-get update && apt-get install -y "wait-for-it"

# Builder image
FROM base AS builder
ENV NODE_ENV=development
WORKDIR /financial-manager-api

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run lint
RUN npm run build

# Development image
FROM base AS development
ENV NODE_ENV=development
WORKDIR /financial-manager-api

COPY --from=builder /financial-manager-api .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# Production image
FROM base as production
ENV NODE_ENV=production
WORKDIR /financial-manager-api

COPY --from=builder /financial-manager-api/package.json .
RUN npm install
COPY --from=builder /financial-manager-api/dist ./dist

EXPOSE 80

CMD ["npm", "run", "start:prod"]
