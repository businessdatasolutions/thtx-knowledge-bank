# THTX Beats CMS Dockerfile
# Multi-stage build for optimized production image

# Stage 1: Build client
FROM node:20-alpine AS client-builder

WORKDIR /app/client

# Copy client package files
COPY client/package*.json ./

# Install dependencies
RUN npm ci

# Copy client source
COPY client/ ./

# Build client
RUN npm run build

# Stage 2: Build server dependencies
FROM node:20-alpine AS server-builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Stage 3: Production image
FROM node:20-alpine AS production

WORKDIR /app

# Copy server dependencies
COPY --from=server-builder /app/node_modules ./node_modules

# Copy server source
COPY server/ ./server/
COPY package*.json ./
COPY tsconfig.json ./

# Copy built client
COPY --from=client-builder /app/client/dist ./client/dist

# Copy generator (needed for Beat generation)
COPY ../_generator ../beats/_generator

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# Environment variables
ENV NODE_ENV=production
ENV PORT=3002

# Expose port
EXPOSE 3002

# Start server
CMD ["node", "--import", "tsx", "server/index.ts"]
