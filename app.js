
/**
 * Module dependencies.
 */

var express = require('express'),
    morgan = require('morgan'), // https://github.com/expressjs/morgan
    bodyParser = require('body-parser'),
    multer = require('multer'),
    http = require('http'),
    path = require('path'),
    bookmarkAPI = require('./app/controllers/BookmarkApiCtrl');

var app = module.exports = express();

//---
// @begin: configs

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('tiny'));

// http://expressjs.com/4x/api.html#req.body
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

// @end: configs
//---

app.get('/rest/bookmarks', bookmarkAPI.getAll);
app.get('/rest/bookmarks/:id', bookmarkAPI.getById);
app.post('/rest/bookmarks', bookmarkAPI.insert);
app.put('/rest/bookmarks/:id', bookmarkAPI.update);
app.delete('/rest/bookmarks/:id', bookmarkAPI.remove);

//---
