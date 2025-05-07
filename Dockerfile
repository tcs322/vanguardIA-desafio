# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

# Definindo diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Compila o projeto Next.js
RUN npm run build

# Etapa 2: Imagem final de produção
FROM node:18-alpine AS runner

# Definindo diretório de trabalho
WORKDIR /app

# Define variáveis de ambiente
ENV NODE_ENV=production

# Copia arquivos necessários do builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
