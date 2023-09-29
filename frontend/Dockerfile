FROM node:18
WORKDIR /app
COPY packages/types/ packages/types/
RUN cd packages/types && npm ci && npm run build
COPY packages/score/ packages/score/
RUN cd packages/score && npm ci && npm run build
COPY frontend/package*.json frontend/
RUN cd frontend && npm ci
