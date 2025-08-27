# Controle de Domótica 

Projeto de diagnóstico desenvolvido para a disciplina de Programação para Internet II do Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas do Instituto Federal do Piauí (IFPI).

## 📝 Descrição

Esta é uma aplicação web que simula o controle de dispositivos em uma casa inteligente (domótica). O sistema permite gerenciar diferentes cômodos, controlar dispositivos individualmente (ligando e desligando) e criar "Cenas" — sequências de ações pré-definidas (como "Modo Cinema" ou "Chegar em Casa") que podem ser executadas com intervalos de tempo programados entre cada ação.

A solução é composta por um backend com uma API REST que gerencia todas as entidades e um frontend que consome essa API para fornecer a interface de usuário.

## 🧑‍💻 Equipe

| Nome | GitHub |
| --- | --- |
| Luiz | [@Luiz-06](https://github.com/Luiz-06) |
| Pedro Venâncio | [@PedroVenanci0](https://github.com/PedroVenanci0) |
| Kovokar | [@Kovokar](https://github.com/Kovokar) |

## ✨ Funcionalidades (Casos de Uso)

- **UC01: Visualizar Status dos Cômodos:** O usuário pode visualizar todos os cômodos cadastrados e o estado (ligado/desligado) dos dispositivos dentro de cada um.
- **UC02: Ligar/Desligar Dispositivo:** O usuário pode alterar o estado de um dispositivo específico entre "Ligado" e "Desligado".
- **UC03: Criar Cena:** Permite ao usuário definir uma nova cena, dando um nome e associando uma sequência de ações.
- **UC04: Editar Cena:** O usuário pode modificar uma cena existente, alterando seu nome, ações, dispositivos e intervalos.
- **UC05: Excluir Cena:** Permite remover permanentemente uma cena do sistema.
- **UC06: Executar Cena:** O usuário pode acionar uma cena para que o sistema execute as ações programadas em sequência.

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js, Express.js
- **Banco de Dados:** PostgreSQL
- **Frontend:** HTML, CSS, JavaScript
- **Versionamento:** Git & GitHub

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o backend do projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd <NOME_DA_PASTA_DO_PROJETO>
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   - Crie uma cópia do arquivo `.env.example` (se houver) ou crie um novo arquivo chamado `.env` na raiz do projeto.
   - Preencha o arquivo `.env` com as suas credenciais do banco de dados (Supabase ou local):
     ```ini
     DB_HOST=SEU_HOST
     DB_PORT=5432
     DB_DATABASE=SEU_DATABASE
     DB_USER=SEU_USER
     DB_PASSWORD=SUA_SENHA
     ```

4. **Inicie o servidor:**
   ```bash
   npm start
   ```
   O servidor estará rodando em `http://localhost:3000` (ou na porta que você configurar).

## 📄 Documentação da API

A documentação dos endpoints da API, especificando métodos, URLs, parâmetros, corpos de requisição e respostas, pode ser encontrada nos artefatos do projeto.

---
**Professor:** Rogério Silva
**Período:** 2025.2
