# Use Node 24 alpine as base image
FROM node:24-alpine AS base

# Change the working directory to /build
WORKDIR /build

# Copy package files
COPY package*.json ./

# Install all dependencies (including tsc for compilation)
RUN npm ci

# Copy the entire source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Compile TypeScript using tsc
RUN npm run build

# Prune devDependencies to optimize image size
RUN npm prune --omit=dev

# Environment variables
ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV PORT=3000
ENV POSTGRES_HOST=db

# Document the port
EXPOSE 3000

# Start the compiled production server
CMD ["node", "dist/server.js"]
