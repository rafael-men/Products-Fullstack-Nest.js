# ERP Gerenciador de Produtos com Geração de Relatório de Vendas 

Este projeto consiste em uma aplicação FullStack que integra diversas tecnologias modernas, como NestJS, MongoDB, ReactJS TSX, Serverless Framework e Docker. O objetivo é criar uma aplicação que gerencia produtos, categorias e pedidos, com funcionalidades de CRUD, análise de métricas de pedidos dos produtos cadastrados e geração de um relatório de vendas com simulação de lambda para a AWS através do serverless framework.

A aplicação foi projetada para ser executada localmente.

## Tecnologias Utilizadas

- Backend: NestJS (TypeScript)

- Banco de Dados: MongoDB (NoSQL)

- Frontend: ReactJS(Vite) + TypeScript

- AWS + Serverless Framework: Funções do Lambda


## Requisitos

- **Node.js** (versão 16 ou superior) instalado.
- **Serverless Framework** instalado globalmente (para a função Lambda).
- **MongoDB** caso queira executar um banco localmente visto que o banco da aplicação é uma instância do Railway.


### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

## Como executar o projeto (localmente)

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### Backend

 
```bash
cd backend
npm i
npm start
```

### Frontend 

```bash
cd frontend
npm i
npm run dev
```
### Popular dados no banco 

```bash
cd backend
npm run seed
```
### Executar o serverless framework pra gerar relatório de vendas

```bash
cd backend
cd lambdas
serverless offline
```

- frontend iniciará no **localhost:5173** 

- backend iniciará no **localhost:3008**

## Funcionalidades Principais

### 1. Backend (NestJS)

- CRUD de Produtos: Criação, listagem, atualização e deleção de produtos.

- CRUD de Categorias: Criação, listagem, atualização e deleção de categorias.

- CRUD de Pedidos: Criação, listagem, atualização e deleção de pedidos.

### 2. Frontend (ReactJS)

- Página de Produtos: Listagem, criação, edição e deleção de produtos, com upload de imagens para o S3.

- Página de Categorias: Listagem, criação, edição e deleção de categorias.

- Página de Pedidos: Listagem, criação, edição e deleção de pedidos.

- Dashboard de Vendas de Produtos: Exibição de métricas sobre os pedidos, como quantidade total de pedidos, receita total.

### 3. Função Lambda (Serverless Framework)
- Processamento em Segundo Plano: A função Lambda pode ser configurada para realizar tarefas em segundo plano, como processar relatórios de vendas ou enviar notificações quando um novo pedido é criado.

<hr>

Este projeto foi desenvolvido com o objetivo de demonstrar habilidades em desenvolvimento Full Stack, utilizando tecnologias modernas e boas práticas de código. Sendo o mesmo projetado para ser simples de executar, com todas as configurações necessárias fornecidas no repositório.

