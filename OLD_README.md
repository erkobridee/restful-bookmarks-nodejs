# RESTful Bookmarks Node.js

[![Node Dependencies](https://david-dm.org/erkobridee/restful-bookmarks-nodejs.png)](https://david-dm.org/erkobridee/restful-bookmarks-nodejs)

Exemplo de aplicação para salvar links, onde a interface utiliza AngularJS + Twitter Bootstrap e o lado do servidor utilizado o Node.js + Express.js para disponibilizar um serviço de dados RESTful via json.

* [Histório / Alterações](https://github.com/erkobridee/restful-bookmarks-nodejs/releases)


## Guia de instalação

### Clone

```bash
$ git clone https://github.com/erkobridee/restful-bookmarks-nodejs.git
$ cd restful-bookmarks-nodejs/
```


### Montando o ambiente local para uso desse projeto

Feito o download/clone do projeto para a sua máquina local, realize o respectivos passos a seguir:

1. Vá até o diretório do projeto
2. Execute o comando:

  `npm install`

3. Para executar, use o comando:

  `node app`


## Desenvolvimento com Sublime Text

1. Para o desenvolvimento, vá até o Sublime Text, *File > Open...* e selecione o diretório do projeto

2. Agora é só codificar :)


## Licença

MIT : [erkobridee.mit-license.org](http://erkobridee.mit-license.org)


## Utilizado neste projeto

* Ambiente de desenvolvimento

  * [Sublime Text](http://www.sublimetext.com/) 2
  
  	* [Sublime Text Keyboard Shortcut Cheat Sheet | Sweetmeat](http://sweetme.at/2013/08/08/sublime-text-keyboard-shortcuts/)
  
  	* [Sublime Package Control](http://wbond.net/sublime_packages/package_control) 
  	
  	* [Sublime Terminal – a Sublime Text 2 Package | wbond](http://wbond.net/sublime_packages/terminal)

	* [Write HTML & CSS Faster with Emmet | Hongkiat.com](http://www.hongkiat.com/blog/html-css-faster-emmet/)
	

* Cliente
  * [AngularJS](http://angularjs.org/) 1.2.1
  * [Twitter Bootstrap](twitter.github.com/bootstrap) 3.x

* Servidor
  * [Node.js](http://nodejs.org/) v0.10+
  * [Express.js](http://expressjs.com/) 4.x

Post que auxiliou na montagem desse projeto: [Writing an AngularJS App with an Express + Node.js Backend](http://briantford.com/blog/angular-express.html). Uma leitura adicional muito útil e recomendável para se trabalhar com JavaScript : [JavaScript Patterns Collection](http://shichuan.github.com/javascript-patterns/)
  

## Quanto ao RESTful do projeto

A definição do método a ser executado é definido no cabeçalho da requisição enviada para o servidor.

* **GET** - recupera 1 ou mais bookmarks

  * [.../rest/bookmarks/]() - lista todos os bookmarks | agora som suporte para paginação `?page=${num}&size=${length}`

  * [.../rest/bookmarks/{id}]() - retorna o respectivo bookmark pelo seu ID

* **POST** - insere um novo

  * [.../rest/bookmarks/]() - enviado no corpo da requisição

* **PUT** - atualiza um existente

  * [.../rest/bookmarks/{id}]() - enviado no corpo da requisição

* **DELETE** - remove 1 bookmark pelo ID

  * [.../rest/bookmarks/{id}]() 


## Passos para gerar a estrutura inicial do projeto

Foram utilizadas as instruções [Using express(1) to generate an app](http://expressjs.com/guide.html#executable)

```
$ express --css stylus restful-bookmarks-nodejs

create : restful-bookmarks-nodejs
create : restful-bookmarks-nodejs/package.json
create : restful-bookmarks-nodejs/app.js
create : restful-bookmarks-nodejs/public
create : restful-bookmarks-nodejs/public/javascripts
create : restful-bookmarks-nodejs/public/images
create : restful-bookmarks-nodejs/public/stylesheets
create : restful-bookmarks-nodejs/public/stylesheets/style.styl
create : restful-bookmarks-nodejs/routes
create : restful-bookmarks-nodejs/routes/index.js
create : restful-bookmarks-nodejs/views
create : restful-bookmarks-nodejs/views/layout.jade
create : restful-bookmarks-nodejs/views/index.jade

install dependencies:
  $ cd restful-bookmarks-nodejs && npm install

run the app:
  $ node app
```

Porém, a estrutura utilizada para o projeto foi modificada para:

```
restful-bookmarks-nodejs/
  package.json
  app.js
  app/
    controllers/
      BookmarkApiCtrl.js
      UrlCtrl.js  
    helpers/
      FInterface.js
      MySqlProvider.js
    models/
      interfaces/
        ModelFInterface.js
      mock/
        BookmarkModel.js
      mysql/
        BookmarkModel.js
        bookmarks.sql
      mongodb/
        BookmarkModel.js
      BookmarkModel.js
    views/
      css/
        style.styl
      layout.jade
      index.jade
  public/
	# frontend - código da app em angular.js 
```
