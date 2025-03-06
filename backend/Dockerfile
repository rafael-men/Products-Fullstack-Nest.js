
FROM node:18 AS builder
WORKDIR /app
COPY Products-Fullstack-Nest.js/backend/package*.json ./
RUN npm install
COPY Products-Fullstack-Nest.js/backend ./


RUN npm run build
FROM node:18
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist


EXPOSE 3000

# Comando para iniciar a API
CMD ["nest", "start"]
