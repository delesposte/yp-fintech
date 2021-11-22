# Yp Fintech
O projeto consiste em uma API de exemplo de um cadastro de contas de uma fintech.

Pensando na qualidade do objeto do estudo de caso, foram levados em consideração boas práticas para desenvolvimento de softwares, testes unitários, testes de integração e elementos como Design Patterns, POO, SOLID, entre outros.

## 🔧 Instalação & Execução
Clone do repositório
```
git clone https://github.com/delesposte/yp-fintech.git
```

Instalação das dependências
```
npm i
```

Deploy da aplicação (app + bd) em containers do Docker
```
npm run deploy
```

## ⚙️ Testes 
Importe a collection no Postman
```
postman.json
```

A collection possui os métodos
```
 getIsAPIRunning -> Testa se a API está executando
 getAccounts -> Recupera a lista de contas cadastradas
 createAccount -> Cria uma conta. Obs.: só é permitido uma conta por CPF
 disableAccount -> Desativa uma conta
 enableAccount -> Ativa uma conta
 changeAccount -> Altera uma conta. Obs.: só é permitido alterar o telefone e o endereço
```

## 🛠️ Construído com
* [Node](https://nodejs.org/en/) - Ambiente de execução
* [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação
* [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) - Arquitetura
* [TypeORM](https://typeorm.io/#/) - ORM
* [Postgresql](https://www.postgresql.org/) - Banco de dados
* [Express](https://expressjs.com/) - Servidor http
* [Docker](https://www.docker.com/) - Provedor de containers
