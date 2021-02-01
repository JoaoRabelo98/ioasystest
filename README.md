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

```
Agora crie um banco chamado: **ioasysteste**

```
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

[Download insomnia](https://insomnia.rest/download/)

Faça o download do workspace no seguinte link: [Workspace Inosmnia ioasys](https://github.com/JoaoRabelo98/ioasystest/blob/main/requestIoasys.json)

Faça a importação dentro do insomnia. Para saber como importar workspaces no insomnia, siga os passos desse link: [Como importar workspaces no insomnia](https://support.insomnia.rest/article/52-importing-and-exporting-data)

Feito isso, pode fazer as request normalmente. 😁🔝

