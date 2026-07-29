# syntax=docker/dockerfile:1
# CultureGlow24 - Next.js standalone image.
#
#   docker build -t culture-glow-web:test --build-arg CONTENTFUL_ENABLED=false .
#
# NEXT_PUBLIC_* values and all Contentful content are baked in at `next build`,
# so this image is environment-specific: a dev image and a prod image are
# different builds, not the same image with different env vars.
#
# Runtime secrets (RESEND_API_KEY and the form recipient addresses) are read
# inside the POST handlers and come from the Kubernetes Secret at run time.
# They are deliberately NOT build args - build args land in the image history.
#
# CONTENTFUL_MANAGEMENT_TOKEN must never appear here: it is a write-scoped
# token used only by scripts/contentful/*, which are excluded via .dockerignore.

# ---- Builder ----------------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app

ENV CI=true
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Inlined into the client bundle.
ARG NEXT_PUBLIC_WHATSAPP_NUMBER=""
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=""
# Read during static generation. With CONTENTFUL_ENABLED=false the build falls
# back to the committed content in src/lib/content and content/*.json, which
# is what dev does today. Flipping this on is a CI change, not a Dockerfile one.
ARG CONTENTFUL_ENABLED="false"
ARG CONTENTFUL_SPACE_ID=""
ARG CONTENTFUL_ENVIRONMENT=""
ARG CONTENTFUL_DELIVERY_TOKEN=""
ARG SOURCE_REVISION=""

ENV NEXT_PUBLIC_WHATSAPP_NUMBER=$NEXT_PUBLIC_WHATSAPP_NUMBER \
    NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID \
    CONTENTFUL_ENABLED=$CONTENTFUL_ENABLED \
    CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID \
    CONTENTFUL_ENVIRONMENT=$CONTENTFUL_ENVIRONMENT \
    CONTENTFUL_DELIVERY_TOKEN=$CONTENTFUL_DELIVERY_TOKEN \
    SOURCE_REVISION=$SOURCE_REVISION

RUN npm run build

# ---- Runtime ----------------------------------------------------------------
FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# node:22-alpine already ships an unprivileged `node` user (uid 1000).
# The standalone server writes nothing outside /tmp, so no chown is needed
# beyond ownership of the copied tree.
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

USER node
EXPOSE 3000

ARG SOURCE_REVISION=""
LABEL org.opencontainers.image.source="https://github.com/Techally-Consult/culture-glow" \
      org.opencontainers.image.revision="$SOURCE_REVISION"

CMD ["node", "server.js"]
