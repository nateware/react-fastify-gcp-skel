FROM node:22-alpine AS pruner
RUN corepack enable && corepack prepare pnpm@10.6.5 --activate
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY backend/package.json backend/
COPY packages/shared/package.json packages/shared/
RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@10.6.5 --activate
WORKDIR /app
COPY --from=pruner /app/ .
COPY backend/ backend/
COPY packages/shared/ packages/shared/
RUN pnpm --filter backend run build

FROM node:22-alpine
RUN corepack enable && corepack prepare pnpm@10.6.5 --activate
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY backend/package.json backend/
COPY packages/shared/package.json packages/shared/
COPY packages/shared/src/ packages/shared/src/
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/drizzle ./backend/drizzle
WORKDIR /app/backend
EXPOSE 8080
CMD ["node", "dist/server.js"]
