ARG REGISTRY=dhi.io
FROM ${REGISTRY}/bun:1.3.11-alpine3.22-dev AS builder

WORKDIR /app

COPY package.json bun.lock ./

FROM builder AS prod-deps
RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache \
    bun install --production --frozen-lockfile

FROM builder AS build-deps
RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

FROM build-deps AS build
COPY . .
RUN bun run build

FROM ${REGISTRY}/bun:1.3.11-alpine3.22 AS runtime
WORKDIR /app
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

ARG APP_VERSION=latest

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

LABEL version=$APP_VERSION
LABEL description="Astro based personal website"

EXPOSE $PORT
CMD ["bun", "run", "./dist/server/entry.mjs"]
