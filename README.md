RESTful Bookmarks Node.js
=================================

Exemplo de aplicação para salvar links, onde a interface utiliza AngularJS + Twitter Bootstrap e o lado do servidor utilizado o Node.js + Express.js para disponibilizar um serviço de dados RESTful via json.


Utilizado neste projeto
-----------------------

* Ambiente de desenvolvimento
  * [Sublime Text](http://www.sublimetext.com/) 2

* Cliente
  * [AngularJS](http://angularjs.org/) 1.0.1
  * [Twitter Bootstrap](twitter.github.com/bootstrap) 2.0.4

* Servidor
  * [Node.js](http://nodejs.org/) v0.8.7
  * [Express.js](http://expressjs.com/) 3.0.3
  * [Jade](http://jade-lang.com/) (outra sintaxe para gerar HTML)
  * [Stylus](http://learnboost.github.com/stylus/) (outra sintaxe para gerar CSS)

Post que auxiliou na montagem desse projeto: [Writing an AngularJS App with an Express + Node.js Backend](http://briantford.com/blog/angular-express.html). Uma leitura adicional muito útil e recomendável para se trabalhar com JavaScript : [JavaScript Patterns Collection](http://shichuan.github.com/javascript-patterns/)
  

Montando o ambiente local para uso desse projeto
------------------------------------------------

Feito o download/clone do projeto para a sua máquina local, realize o respectivos passos a seguir:

1. Vá até o diretório do projeto
2. Execute o comando:

  `npm install`

3. Para executar, use o comando:

  `node app`

4. Para o desenvolvimento, vá até o Sublime Text, *File > Open...* e selecione o diretório do projeto
5. Agora é só codificar :)


Quanto ao RESTful do projeto
----------------------------
A definição do método a ser executado é definido no cabeçalho da requisição enviada para o servidor.

* **GET** - recupera 1 ou mais bookmarks
  * [.../api/bookmarks/]() - lista todos os bookmarks
  * [.../api/bookmarks/{id}]() - retorna o respectivo bookmark pelo seu ID
* **POST** - insere um novo
  * [.../api/bookmarks/]() - enviado via post
* **PUT** - atualiza um existente
  * [.../api/bookmarks/{id}]() - enviado via post 
* **DELETE** - remove 1 bookmark pelo ID
  * [.../api/bookmarks/{id}]() 


Passos para gerar a estrutura inicial do projeto
------------------------------------------------

Foram utilizadas as instruções [Using express(1) to generate an app](http://expressjs.com/guide.html#executable)

<pre><code>$ express --css stylus restful-bookmarks-nodejs

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
  $ node app</code></pre>

Porém, a estrutura utilizada para o projeto foi modificada para:

<pre><code>restful-bookmarks-nodejs/
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
    js/
      app.js
      controllers.js
      services.js
    tpl/
      list.html
      edit.html</code></pre>


Histórico
----------------------------

* [v0](https://github.com/erkobridee/restful-bookmarks-nodejs/tree/v0)

versão inicial e básica

* [v1](https://github.com/erkobridee/restful-bookmarks-nodejs/tree/v1)

versão organizada e utilizando uma base de dados fake em memória

* [v2](https://github.com/erkobridee/restful-bookmarks-nodejs/tree/v2)

  * versão com suporte para acesso aos dados em um base mysql, ver o diretório /app/models/mysql

  * para utilizar o mysql, altere o atributo `use` do arquivo: /app/models/BookmarkModel.js

* [v3](https://github.com/erkobridee/restful-bookmarks-nodejs/tree/v3)

  * versão com suporte para o [mongodb](http://www.mongodb.org/), através do mongoosejs, ver o diretório /app/models/mongodb

  * para utilizar o mongodb, altere o atributo `use` do arquivo: /app/models/BookmarkModel.js


