FROM docker.io/node:24.13.1-alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

FROM builder AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM prod-deps AS build-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM build-deps AS build
COPY . .
RUN pnpm run build

FROM dhi.io/node:24.13.1 AS runtime
WORKDIR /app
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

ENV HOST=0.0.0.0
ENV SITE_URL=https://www.alexlebens.dev
ENV DIRECTUS_URL=https://directus.alexlebens.net
ENV PORT=4321

LABEL version="2.11.0"
LABEL description="Astro based personal website"

EXPOSE $PORT
CMD ["node", "./dist/server/entry.mjs"]
