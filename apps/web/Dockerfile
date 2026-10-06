# ── Stage 1: builder ─────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY apps/web/package.json ./apps/web/
COPY packages/ ./packages/

RUN yarn workspaces focus @menu-planner/web --production=false

COPY tsconfig.base.json ./
COPY apps/web ./apps/web

# Baked into the client bundle at build time by Vite.
# Default "/api" relies on the reverse proxy routing /api/* to the api service
# on the same origin, so no domain needs to be hardcoded into the image.
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app/apps/web
RUN yarn build

# ── Stage 2: runner ──────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]