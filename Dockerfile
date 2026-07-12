# ==========================================
# Etapa 1: Dependencias (Caché determinista)
# ==========================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ==========================================
# Etapa 2: Builder (Compilación)
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Deshabilitamos la telemetría de Next.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ==========================================
# Etapa 3: Runtime (Ejecución endurecida)
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Principio de menor privilegio: Usuario non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiamos solo los assets compilados y necesarios
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Ejecutamos el servidor standalone de node, no npm
CMD ["node", "server.js"]