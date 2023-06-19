FROM node:18
WORKDIR /workspace
COPY package.json .
COPY package-lock.json .
RUN npm ci
