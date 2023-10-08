FROM node:18
WORKDIR /app
COPY package*.json .
COPY packages/ packages/
RUN npm run ci:packages && npm run build:packages
COPY backend/package*.json backend/
RUN cd backend && npm ci
