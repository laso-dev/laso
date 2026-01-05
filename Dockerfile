# Build stage
FROM node:20-alpine AS build

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace config
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY api/package.json api/
COPY web/package.json web/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY api api
COPY web web

# Build
RUN pnpm build

# Production stage
FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace config
COPY pnpm-workspace.yaml package.json ./
COPY api/package.json api/

# Copy built files
COPY --from=build /app/api/dist api/dist
COPY --from=build /app/web/dist web/dist

# Install production dependencies only
RUN pnpm install --prod --filter api

EXPOSE 3000

WORKDIR /app/api

CMD ["node", "dist/index.js"]
