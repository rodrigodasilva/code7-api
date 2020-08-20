## Code 7 - API

### Pré-requisitos

- Docker
- Npm/Yarn

### Como usar

1. Clone o repositório na sua máquina

   > git clone https://github.com/rodrigodasilva/code7-api

2. Acesse a pasta

   > cd code7-api

3. Instale as dependências

   > yarn

4. Inicie o banco de dados Mongodb utilizando o docker

   > docker run --name code7-mongodb -p 27017:27017 -d -t mongo

5. Inicie o bando de dados Redis utilizando o docker

   > docker run --name code7-redis -p 6379:6379 -d -t redis:alpine

6. Crie um arquivo 'ormconfig.json' com base no 'ormconfig.example.json' para configuração do Mongodb.

   > cp ormconfig.example.json ormconfig.json

7. Cria um arquivo '.env' com base no '.env.example' para configuração das variáveis de ambiente.

   > cp .env.example .env

8. Por fim, inicie a aplicação
   > yarn dev:server
