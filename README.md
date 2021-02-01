<h3 align="center">Teste ioasys</h3>

<div align="center">

</div>

---

## 📝 Conteúdo

- [Començando](#getting_started)
- [Testes](#tests)
- [Requests](#requests)

## 🏁 Començando <a name = "getting_started"></a>

Para começar vamos seguir os seguintes passos abaixo: 

```
git clone https://github.com/JoaoRabelo98/ioasystest.git

cd ioasystest

yarn

docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

yarn typeorm migration:run

yarn dev:server

```

Agora o projeto já está ronando em sua máquina local 😁🔝

## 🔧 Rodando os teste <a name = "tests"></a>

Para rodar os testes em sua máquina, realize o seguinte comando abaixo: 

```
yarn test
```

## 🌎👨‍💻👩‍💻 Fazendo as requisções HTTP <a name = "requests"></a>

Para fazer as requisições considere instalar o insomnia em sua máquina:

- [Download insomnia](https://insomnia.rest/download/)

