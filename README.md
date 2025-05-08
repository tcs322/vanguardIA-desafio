# 🚀 Projeto de Sincronização com n8n + Next.js + Neon.tech

Este projeto integra uma aplicação **Next.js** com o serviço de automação **n8n**, sincronizando dados de usuários e posts da API JSONPlaceholder para um banco **PostgreSQL** hospedado no **Neon.tech**. O sistema valida os dados com **Zod**, registra logs e erros, e envia relatórios diários por e-mail.

---

## 🛠️ Configuração do Projeto

### 1. Clone o repositório

```bash
git clone git@github.com:tcs322/vanguardIA-desafio.git
cd vanguardIA-desafio
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados com Neon.tech

- Crie uma conta gratuita em [https://neon.tech](https://neon.tech)
- Crie um projeto PostgreSQL
- Copie a `connection string` (exemplo: `postgresql://user:password@host/db`)
- Crie um arquivo `.env` com o conteúdo:

```env
DATABASE_URL=postgresql://user:password@host/db

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=no-reply@myapp.com
SMTP_PASS=suasenha
```

### 4. Inicialize o banco com Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

> Use `npx prisma migrate reset` para um reset completo.

### 5. Rode a aplicação

```bash
npm run dev
```

---

## 🧠 Arquitetura do Projeto

```text
.
├── src/
│   ├── app/
│   │   └── api/         # Rotas API REST (ex: /api/sync, /api/send-summary)
│   ├── lib/             # Lógica de negócios (ex: saveUser, sendEmail)
│   └── prisma/          # Prisma Client + esquema de banco
├── prisma/
│   └── schema.prisma    # Definição das models do banco
├── workflows/           # Workflows exportados do n8n
├── .env                 # Variáveis de ambiente
└── README.md
```

---

## 🔁 Automação com n8n

### Workflow 1 – Sincronização horária

- Disparado a cada hora
- Busca usuários e posts do JSONPlaceholder
- Valida dados com Zod
- Salva no banco de dados
- Registra sucesso ou erro em tabelas `Log` e `Error`
- Dispara notificação por e-mail com o status da execução

### Workflow 2 – Relatório diário

- Disparado todos os dias às 23:59
- Conta quantos usuários, posts e erros foram inseridos no dia
- Envia resumo para o endpoint `/api/send-summary`
- A API envia um e-mail com o conteúdo do relatório

---

## 📬 Envio de E-mails

A função `sendEmail` está localizada em `src/lib/sendEmail.ts` e utiliza `nodemailer`. Exemplo de uso:

```ts
await sendEmail({
  to: "admin@myapp.com",
  subject: "Relatório diário",
  text: "Resumo do dia...",
});
```

Configure as credenciais SMTP no `.env`.

---

## ✅ Endpoints principais

- `POST /api/sync`: Sincroniza dados do JSONPlaceholder
- `GET /api/recent-posts`: Retorna os 10 posts mais recentes
- `POST /api/send-summary`: Recebe dados agregados e dispara e-mail de resumo

---

## 📂 Exportação dos Workflows

Os arquivos `.json` dos workflows estão disponíveis em `/workflows`.

Para importar no n8n:

1. Clique no botão **Workflows** no canto superior esquerdo
2. Selecione **Import workflow**
3. Cole o conteúdo do arquivo `.json` ou envie o arquivo

---

## 🧪 Testes rápidos com cURL

```bash
curl http://localhost:3000/api/recent-posts

curl -X POST http://localhost:3000/api/send-summary \
  -H "Content-Type: application/json" \
  -d '{
    "users_count": 10,
    "posts_count": 100,
    "errors_count": 0,
    "date": "2025-05-07"
  }'
```

---

## 📌 Requisitos

- Node.js 18+
- Conta no [Neon.tech](https://neon.tech/)
- Conta SMTP (ex: Mailtrap, Gmail com app password, etc.)
- n8n rodando localmente ou hospedado

---

## 📄 Licença

MIT
