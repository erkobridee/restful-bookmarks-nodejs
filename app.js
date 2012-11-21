
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')

  , urlService = require('./app/service/UrlService')

  , bookmarkAPI = require('./app/service/BookmarkApiService')
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


app.get('/', urlService.index);

app.get('/api/bookmarks', bookmarkAPI.getAll);
app.get('/api/bookmarks/:id', bookmarkAPI.getById);
app.post('/api/bookmarks', bookmarkAPI.insert);
app.put('/api/bookmarks/:id', bookmarkAPI.update);
app.delete('/api/bookmarks/:id', bookmarkAPI.remove);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
