# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Vite app -> outputs to /app/dist
RUN npm run build


# ---------- Stage 2: Serve ----------
FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy only the built static files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (for SPA routing, see Step 3)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
