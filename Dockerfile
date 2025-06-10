ARG REGISTRY=docker.io
FROM ${REGISTRY}/node:22.16.0-alpine3.22 AS base

LABEL version="0.8.12"
LABEL description="Astro based personal website"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM prod-deps AS build-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM build-deps AS build
COPY . .
RUN pnpm run build
RUN pnpm prune --prod

FROM base AS runtime
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

ENV HOST=0.0.0.0
ENV SITE_URL=https://www.alexlebens.dev
ENV DIRECTUS_URL=https://directus.alexlebens.dev
ENV PORT=4321

EXPOSE $PORT
CMD ["node", "./dist/server/entry.mjs"]
