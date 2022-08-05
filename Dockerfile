FROM node:16-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY package.json .

RUN npm install

USER appuser

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]