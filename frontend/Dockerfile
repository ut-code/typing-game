FROM node:18
WORKDIR /app
COPY package*.json .
COPY packages/api-types/package*.json packages/api-types/
COPY packages/question-sets/package*.json packages/question-sets/
COPY packages/score/package*.json packages/score/
COPY packages/types/package*.json packages/types/
RUN npm run ci:packages
COPY frontend/package*.json frontend/
RUN cd frontend && npm ci
