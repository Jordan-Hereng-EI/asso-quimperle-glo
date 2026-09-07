# syntax=docker/dockerfile:1

# ---- deps : installe les dépendances (cache npm réutilisé entre builds) ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- build : compile Next.js en mode standalone ----
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Valeurs factices pour le build uniquement : les pages statiques n'en
# dépendent pas, mais le code qui les lit est chargé à la compilation.
ENV SESSION_SECRET=build-time-placeholder-not-used-at-runtime
RUN npm run build

# ---- run : image finale minimale, utilisateur non-root ----
FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV UPLOADS_DIR=/app/uploads

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  # Point de montage du volume des photos : créé ici avec le bon propriétaire,
  # Docker le reprend pour initialiser le volume nommé.
  && mkdir -p /app/uploads && chown nextjs:nodejs /app/uploads

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
# Jouées au démarrage par instrumentation.ts (lib/db.ts → migrate()).
COPY --from=build --chown=nextjs:nodejs /app/migrations ./migrations

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
