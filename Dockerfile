FROM node:24.1.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# pre-install pnpm
RUN pnpm version

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --prod

FROM deps AS build
COPY src ./src
COPY public ./public
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm build

FROM nginx:1.27.5
COPY nginx/conf.d /etc/nginx/conf.d
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
