
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')

  , urlCtrl = require('./app/controllers/UrlCtrl')

  , bookmarkAPI = require('./app/controllers/BookmarkApiCtrl')
;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'app', 'views'));
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware({
    src: path.join(__dirname, 'app', 'views'),
    dest: path.join(__dirname, 'public')
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


//app.get('/', urlCtrl.index);

app.get('/rest/bookmarks', bookmarkAPI.getAll);
app.get('/rest/bookmarks/:id', bookmarkAPI.getById);
app.post('/rest/bookmarks', bookmarkAPI.insert);
app.put('/rest/bookmarks/:id', bookmarkAPI.update);
app.delete('/rest/bookmarks/:id', bookmarkAPI.remove);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
