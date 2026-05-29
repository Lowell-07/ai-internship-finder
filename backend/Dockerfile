FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backend

COPY --from=deps /app/node_modules ./node_modules
COPY . .

USER backend

EXPOSE 8000
ENV PORT=8000

CMD ["npm", "start"]
