FROM node:18
WORKDIR /app
COPY package*.json .
COPY packages/api-serializers/package*.json packages/api-serializers/
COPY packages/api-types/package*.json packages/api-types/
COPY packages/question-sets/package*.json packages/question-sets/
COPY packages/typing-core/package*.json packages/typing-core/
RUN npm run ci:packages
COPY frontend/package*.json frontend/
RUN cd frontend && npm ci
