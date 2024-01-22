FROM node:20.11.0 as builder

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.11.0-alpine

WORKDIR /app/backend

COPY --from=builder /app/backend/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]