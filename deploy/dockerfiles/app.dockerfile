FROM node:21-bookworm-slim

ENV DEBUG=true
ENV ENV=development
ENV NODE_ENV=development
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3014
ENV API_URL=https://avacoin.elastoo.com/api/
ENV API_URL_BROWSER=https://avacoin.elastoo.com/api/
ENV API_WS_URL=wss://avacoin.elastoo.com/api/
COPY ./ /app/
WORKDIR /app/

# Install Yarn if it is not installed
RUN yarn -v || npm install -g yarn

# Install requirements
RUN yarn install && yarn build
