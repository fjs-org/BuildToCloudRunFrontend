# Stage 1: Build the Angular application
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's html folder
# Replace 'your-app-name' with the name found in your angular.json
RUN -ls -lart /app/dist
COPY --from=build /app/dist/firebase-auth-with-java-backend/browser /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]