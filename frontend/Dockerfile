FROM node:20.11.0 as builder

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Use a production-ready image to serve the application
FROM nginx:alpine

ARG PORT
# Copy the built files from the previous stage
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]