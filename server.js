var app = require('./app');


var server = app.listen(process.env.PORT || 9000, function () {

  var port = server.address().port;

  console.log("Express server listening on port " + port);

});