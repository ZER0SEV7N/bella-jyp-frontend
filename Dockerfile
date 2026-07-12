# ==========================================
# STAGE 1: Dependencias (Caché determinista)
# ==========================================
FROM node:20-alpine AS deps
# libc6-compat es requerido por process.dlopen en Alpine
RUN apk add --no-cache libc6-compat
# Inyectar pnpm
RUN corepack enable pnpm

WORKDIR /app
# Copiamos archivos de configuración del workspace y dependencias
COPY package.json pnpm-lock.yaml ./
# En un monorepo real, copiarías pnpm-workspace.yaml aquí también si es necesario

# Instalación estricta y congelada
RUN pnpm install --frozen-lockfile

# ==========================================
# STAGE 2: Builder (Compilación)
# ==========================================
FROM node:20-alpine AS builder
RUN corepack enable pnpm
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Deshabilitamos la telemetría para ahorrar I/O en build
ENV NEXT_TELEMETRY_DISABLED=1

# Transmutamos TypeScript a JS optimizado (Genera la carpeta standalone)
RUN pnpm run build

# ==========================================
# STAGE 3: Runtime (Ejecución endurecida)
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Principio de Menor Privilegio (PoLP): Usuario non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Directorio para la caché de imágenes de Next.js
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiamos solo los assets compilados y purificados
COPY --from=builder /app/public ./public
# Archivos autogenerados para el modo standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Cedemos el control al usuario sin privilegios
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Ejecutamos el servidor precompilado puro. Prohibido usar "pnpm start"
CMD ["node", "server.js"]