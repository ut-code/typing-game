FROM node:18
WORKDIR /app
COPY package*.json .
COPY packages/api-serializers/package*.json packages/api-serializers/
COPY packages/api-types/package*.json packages/api-types/
COPY packages/typing-question-sets/package*.json packages/typing-question-sets/
COPY packages/typing-core/package*.json packages/typing-core/
RUN npm run ci:packages
COPY backend/package*.json backend/
RUN cd backend && npm ci
