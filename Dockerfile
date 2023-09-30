FROM node:18
WORKDIR /app
COPY packages/api-types packages/api-types/
RUN cd packages/api-types && npm ci && npm run build
COPY packages/question-sets/ packages/question-sets/
RUN cd packages/question-sets && npm ci && npm run build
COPY packages/types/ packages/types/
RUN cd packages/types && npm ci && npm run build
COPY packages/score/ packages/score/
RUN cd packages/score && npm ci && npm run build
COPY package*.json .
RUN npm ci
