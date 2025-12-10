# Frontend (Vite React) Dockerfile - production build
FROM node:20-alpine
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci || npm install

# Copy source
COPY . .

# Build the static assets
RUN npm run build

# Expose preview server port
EXPOSE 4173

# Serve the built app
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
