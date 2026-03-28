# Stage 1: Build the Vite application with Node.js
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Cloud Run defaults to PORT=8080, but we let it be overridden
ENV PORT=8080

# Copy the build output containing the static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Overwrite the default config using envsubst to apply the Cloud Run PORT at runtime
# The official nginx image runs standard envsubst against /etc/nginx/templates/*.template
CMD ["/bin/sh" , "-c" , "envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
