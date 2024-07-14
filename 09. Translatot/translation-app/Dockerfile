# Use the official Node.js image for building the application
FROM node:14 AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight web server to serve the built React application
FROM nginx:alpine

# Copy the built React application from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the default port
EXPOSE 80

# Start the web server
CMD ["nginx", "-g", "daemon off;"]
