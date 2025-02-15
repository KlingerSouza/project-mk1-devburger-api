# 📦 DevBurger API

Esta é a API do **DevBurger**, responsável por gerenciar pedidos, usuários e produtos.

## 🚀 Tecnologias

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework para APIs
- **MongoDB** - Banco de dados NoSQL
- **Docker** - Containerização do ambiente
- **AWS** - Hospedagem do backend (EC2, S3, RDS, etc.)

## 📂 Estrutura de Diretórios

```bash
/devburger-api
├── src/
│   ├── config/       # Configurações da aplicação
│   ├── controllers/  # Lógica dos endpoints
│   ├── database/     # Conexão e models do banco de dados
│   ├── middlewares/  # Autenticação, logs e validações
│   ├── routes/       # Definição das rotas da API
│   ├── services/     # Regras de negócio e integrações
│   ├── utils/        # Funções auxiliares
│   ├── app.js        # Configuração principal do Express
│   ├── server.js     # Ponto de entrada da aplicação
├── .env.example      # Exemplo de variáveis de ambiente
├── .gitignore        # Ignora arquivos sensíveis
├── package.json      # Dependências e scripts
└── README.md         # Documentação da API
