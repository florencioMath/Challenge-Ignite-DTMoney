<div align="center">
<img width="140px" src="readmeFiles/logo.svg" />
<h1> DT Money </h1>
</div>

<p align="center">
Aplicativo DT Money desenvolvido durante a Trilha ReactJS do Ignite na Rocketseat <br/>
<a href="https://www.rocketseat.com.br/ignite">Saiba mais sobre o Ignite clicando aqui.</a>
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<br>

<p align="center">
  <img alt="projeto DevLinks" src="readmeFiles/cover.png" width="100%">
</p>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Javascript
- Typescript
- React - ViteJS
- Hook Form
- Styled Components
- Figma
- Vercel
  - Environment Variables
- Firebase

## 💻 Projeto

O DT Money é um aplicativo de controlo financeiro, onde o usuario poderá adicioar entradas e saídas e fazer buscas nas transações cadastradas. <br/>
Esse é o terceiro projeto desenvolvido durante a Trilha Ignite de ReactJS.

- [Acesse o deploy do projeto, na Vercel](https://florenciomath-dtmoney.vercel.app/)


## 🔖 Layout

Você pode visualizar o layout do projeto através [DESSE LINK](https://www.figma.com/file/5yT9ZzZmRQRS4yivGGB3pl/Coffee-Delivery/duplicate). É necessário ter conta no [Figma](https://figma.com) para acessá-lo.


## 🪛 Instalação 

### Pré-requisitos

* npm
```sh
 npm install npm@latest -g
````

### Instalação

1. Clone o repositório
```sh
https://github.com/florencioMath/Challenge-Ignite-CoffeeDelivery.git
```
2. Entre na pasta e instale as dependências
```sh
$ cd dt-money
$ npm install
```
3. Inicie o projeto
```sh
$ npm run dev
```
4. Abra no navegador 
```txt
http://localhost:5173/
```

### Rodar localmente

Esse projeto foi feito o backend com firebase para isso é necessário modificar o arquivo .env.example para .env.local e passar as chaves do projeto que o Firebase fornece. <br/>
Por motivos de segurança eu utilizei as Environment Variables no deploy na Vercel para salvar as variáveis do meu projeto, porém vou deixar abaixo um exemplo de como criar esse database no Firebase e rodar o projeto localmente.

1. Criei um projeto no Firebase
```sh
https://firebase.google.com/
```
2. Siga os passos de instalação do Firebase e pegue os dados do SDK.
2.1 Você deve ter algo parecido com isso:
```sh
const firebaseConfig = {
  apiKey: "Alguma chave",
  authDomain: "Alguma chave",
  projectId: "Alguma chave",
  storageBucket: "Alguma chave",
  messagingSenderId: "Alguma chave",
  appId: "Alguma chave",
  measurementId: "Alguma chave"
};
```
3. No Firestore Databse teremos uma Collection/Coleção com um Document/Documento com alguns Fields/Campos, deixo abaixo um exemplo de como replicar a coleção.
```sh
Colection: transactions
Document: Para ID do documento use o 'Código automático'
Fields: description: string,
        category: string,
        type: string,
        createdAt: string,
        price: number.

```
4. Renomei o arquivo .env.example para .env.local
5. Preencha as chaves que você recebeu no firebaseConfig onde está escrito PUT-THE-KEY-HERE
```sh

VITE_REACT_APP_FIREBASE_APIKEY="PUT-THE-KEY-HERE"
VITE_REACT_APP_FIREBASE_AUTHDOMAIN="PUT-THE-KEY-HERE"
VITE_REACT_APP_FIREBASE_PROJECTID="PUT-THE-KEY-HERE"
VITE_REACT_APP_FIREBASE_STORAGEBUCKET="PUT-THE-KEY-HERE"
VITE_REACT_APP_FIREBASE_MESSEAGINGSENDERID="PUT-THE-KEY-HERE"
VITE_REACT_APP_FIREBASE_APPID="PUT-THE-KEY-HERE"
VITE_REACT_APP_FIREBASE_MEASUREMENTID="PUT-THE-KEY-HERE"

```
6. Dessa for o arquivo firebase.ts será capaz de identificar as keys do seu banco de dados
```sh

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSEAGINGSENDERID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENTID,
});

```

## :memo: Licença

Esse projeto está sob a licença MIT.

---

Feito com 🖤 by Matheus Florêncio :wave:
