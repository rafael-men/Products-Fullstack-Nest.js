# Aplicação Full Stack Gerenciador de Produtos com Relatório de Vendas (NestJS, MongoDB, ReactJS, AWS, Serverless Framework)

Este projeto consiste em uma aplicação Full Stack que integra diversas tecnologias modernas, como NestJS, MongoDB, ReactJS TSX, Serverless Framework e Docker. O objetivo é criar uma aplicação que gerencia produtos, categorias e pedidos, com funcionalidades de CRUD, análise de métricas de pedidos dos produtos cadastrados e geração de um relatório de vendas com simulação de lambda para a aws através do serverless framework.

A aplicação foi projetada para ser executada localmente, utilizando Docker para facilitar o setup e a execução dos serviços necessários.

## Tecnologias Utilizadas
- Backend: NestJS (TypeScript)

- Banco de Dados: MongoDB (NoSQL)

- Frontend: ReactJS(Vite) + TypeScript

- AWS + Serverless Framework: Funções do Lambda

- Docker: Para containerização e execução local dos serviços

## Requisitos

- **Docker** e **Docker Compose** instalados na máquina.
- **Node.js** (versão 16 ou superior) instalado.
- **Serverless Framework** instalado globalmente (para a função Lambda).

## Como Executar o Projeto ( Docker )

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

##  Configuração do Ambiente Docker

### 2.1. Docker Compose
O projeto utiliza Docker Compose para subir os serviços necessários, incluindo o MongoDB, A task do serverless framework, e a aplicação NestJS.
Para iniciar os serviços, execute:

```bash
docker-compose up 
```
## Como executar o projeto (localmente)

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### Backend

use os comandos 

```bash
cd backend
npm i
npm start
```

```bash
Executar o banco: mongod
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
### Executar o serverless framework

```bash
cd backend
cd lambdas
serverless offline
```

frontend iniciará no **localhost:5173** 

backend iniciará no **localhost:3008**

## Funcionalidades Principais

### 1. Backend (NestJS)

- CRUD de Produtos: Criação, listagem, atualização e deleção de produtos.

- CRUD de Categorias: Criação, listagem, atualização e deleção de categorias.

- CRUD de Pedidos: Criação, listagem, atualização e deleção de pedidos.

### 2. Frontend (ReactJS)

- Página de Produtos: Listagem, criação, edição e deleção de produtos, com upload de imagens para o S3.

- Página de Categorias: Listagem, criação, edição e deleção de categorias.

- Página de Pedidos: Listagem, criação, edição e deleção de pedidos.

- Dashboard de KPIs: Exibição de métricas sobre os pedidos, como quantidade total de pedidos, valor médio por pedido, receita total, etc.

### 3. Função Lambda (Serverless Framework)
- Processamento em Segundo Plano: A função Lambda pode ser configurada para realizar tarefas em segundo plano, como processar relatórios de vendas ou enviar notificações quando um novo pedido é criado.

<hr>

Este projeto foi desenvolvido com o objetivo de demonstrar habilidades em desenvolvimento Full Stack, utilizando tecnologias modernas e boas práticas de código. Sendo o mesmo projetado para ser simples de executar, com todas as configurações necessárias fornecidas no repositório.

