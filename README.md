# Entendo melhor sobre telemetria

Projeto criado para entender melhor sobre um dos pilares da observabilidade: a telemetria.

Projeto bem simples usando opentelemetry (para instrumentação e exportação dos dados) e jaeger (coleta e visualização de dados).


## Como rodar

Para rodar o projeto é necessário que tenha o docker e o nodejs (v20 LTS) instalados em sua máquina.

Rodar na raiz do diretório `docker compose up -d`.

Entrar nos diretórios `auth` e `cats-api`, e executar os comandos `npm install` e `npx prisma migrate dev`.

Roda-los individualmente com o comando `npm run start:dev`


## Como usar

### Criar um usuário

`curl localhost:7000/user -H "Content-Type: application/json" --data '{"username": "user-teste", "password": "12313w"}'`


### Receber um token

`curl localhost:7000/user -H "Content-Type: application/json" --data '{"username": "user-teste", "password": "12313w"}'`


### Registrar um gato

`curl -X POST localhost:3000/cat -H "Content-Type: application/json" --data '{"name": "Suri", "image": "http://hisuri.com"}' -H 'token: <token>'`


### Listar os gatos

`curl -X GET localhost:3000/cat -H "Content-Type: application/json" -H 'token: <token>'`


### Olhar traces no jaeger

`[jaeger](http://localhost:16686/)`