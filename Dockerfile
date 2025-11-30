# Use lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port (Render uses 100% dynamic PORT environment variable)
EXPOSE 3000

# Run migrations first, then start the app
CMD ["sh", "-c", "npm run migrate && npm run seed && npm start"]
