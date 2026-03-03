# This Dockerfile is only needed if switching to SSR mode.
# In SPA mode, the frontend is deployed as static files to GCS.
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@10.6.5 --activate
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY frontend/package.json frontend/
COPY packages/shared/package.json packages/shared/
RUN pnpm install --frozen-lockfile
COPY frontend/ frontend/
COPY packages/shared/ packages/shared/
RUN pnpm --filter frontend run build

FROM node:22-alpine
RUN corepack enable && corepack prepare pnpm@10.6.5 --activate
WORKDIR /app
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json ./
COPY --from=builder /app/frontend/package.json frontend/
COPY --from=builder /app/packages/shared/package.json packages/shared/
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/frontend/build frontend/build
WORKDIR /app/frontend
EXPOSE 8080
CMD ["pnpm", "run", "preview"]
