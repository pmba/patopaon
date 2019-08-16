<div align="center">
    <img src="https://pbs.twimg.com/media/DZubgAMXUAADssd.png" alt="emote" style="width: 250px;">

</div>

<h1 align="center">
    TaOnZoka?
</h1>

## Introdução

<img src="https://static-cdn.jtvnw.net/emoticons/v1/1774932/3.0" style="width: 40px; margin: 0 10px 0 0;" align="left">

TaOnZoka, é um bot simples feito com NodeJs e integrado com IFTTT, que tem como missão, notificar os seguidores por meio de um tweet, quando o streamer [Alanzoka](https://twitter.com/alanzoka) estiver online na Twitch.

Este bot foi desenvolvido por [Phyllipe Bezerra](https://github.com/pmba) e sua licensa é livre para distribuição e modificação, usem com sabedoria.

## Projeções Futuras

Resumindo, minhas vontades a curto prazo quando eu tiver tempo livre é de fazer o bot ter uma interação maior com o streamer em si e com seu público.

## Executando o Bot

### Pré-requisitos

O dois únicos pré-requisitos para executá-lo é ter uma versão do NodeJS instalado no seu computador, a versão que eu usei foi v10.15.1, e ter uma conta de desenvolvedor para a api do twitter.

### Executando

<img src="https://static-cdn.jtvnw.net/emoticons/v1/1776432/3.0" style="width: 40px; margin: 0 10px 0 0;" align="left"> 

Caso você queira rodar o bot no seu computador, basta seguir os passos a seguir:

1. Clone o repositório:
```
git clone https://github.com/pmba/taonzoka
```
2. Acesse-o:
```
cd taonzoka
```
3. Agora precisamos instalar os módulos do node rodando:
```
npm i
```
ou
```
npm install
```
ou até mesmo, caso você queira utilizar o yarn:
```
yarn install
```
4. Após isto, dois arquivos foram ocultados por questão de segurança *config.js* e *config.auth.js* ambos na raiz do projeto.

5. Dentro do arquivo *config.js* a estrutura deverá ser a seguinte:
```
module.exports = {
    consumer_key        : '',
    consumer_secret     : '',
    access_token_key    : '',
    access_token_secret : ''
};
```
onde cada lado direito vazio deverá ser preenchido com os dados da sua twitter api. O arquivo *config.auth.json* deverá ter o seguinte formato:

```
module.exports = {
    "auth": true,
    "token": ''
};
```
onde o campo token deverá ser um token secreto que será usado para autenticação na hora de realizar um POST para a rota.

6. Creio que nesse ponto, a maior parte seja de estudo de código, não é um código difícil, então não vai ser um fardo.

## Conclusão

<img src="https://static-cdn.jtvnw.net/emoticons/v1/1774890/3.0" style="width: 40px; margin: 0 10px 0 0;" align="left"> 

Então, é isso, é um projeto simples porém pode ajudar quem está começando na área da programção. Qualquer dúvida ou sugestão, podem entrar em contato comigo via email; pmba@ic.ufal.br