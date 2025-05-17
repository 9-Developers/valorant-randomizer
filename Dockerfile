# Use Node.js 20 as the base image
FROM node:20-slim

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Expose the development port
EXPOSE 3000

# Start the development server
CMD ["pnpm", "dev"] 