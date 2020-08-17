## Instanciamos os bancos de dados

- Postgress

  > docker run --name logenpenho_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
  > docker start logenpenho_postgres

- MongoDB

  > docker run --name mongodb -p 27017:27017 -d -t mongo
  > docker start mongodb

- Redis
  > docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine
  > docker start gobarber-redis

## Migrations

- Criar migrations
  > yarn typeorm migration:create -n CreateAppointments
- Rodar
  > yarn typeorm migration:run
- Desfazer
  > yarn typeorm migration:revert
- Mostar as migration que já executaram
  > yarn typeorm migration:show
