FROM dhi.io/bun:1.3.10-debian13-dev AS builder
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

FROM dhi.io/bun:1.3.10-alpine3.22 AS runtime
WORKDIR /app
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

LABEL version="3.1.0"
LABEL description="Astro based personal website"

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE $PORT
CMD ["bun", "run", "./dist/server/entry.mjs"]
