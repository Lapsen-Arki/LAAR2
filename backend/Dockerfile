# Stage 1: Build
FROM node:20.11.0-alpine as builder

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run
FROM node:20.11.0-alpine

WORKDIR /app/backend

# Copy only necessary directories from the build stage
COPY --from=builder /app/backend/node_modules /app/backend/node_modules
COPY --from=builder /app/backend/package*.json /app/backend/
COPY --from=builder /app/backend/build /app/backend/build

EXPOSE 3000

CMD ["npm", "start"]
