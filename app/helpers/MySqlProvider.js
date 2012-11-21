/* MySqlProvider.js

  MySql - helper

  Provides access to one mysql table through connection pool, 
  with some initial defined functions:
    - findAll
    - findById
    - insert
    - update
    - remove
    - query

  Manage database operations:
    1 - get connection from pool
    2 - execute query
    3 - release connection to pool
    3 - return query result


*/
//-----------------------------------------------------------------------------

var MySqlProvider = (function(){

  var EventEmitter = require('events').EventEmitter
    , mysql = require('mysql')
    , generic_pool = require('generic-pool')
    , async = require('async')
  ;

  //--- private

  // each operation use one isolated connection
  function dbOperation(provider, callback, sql, params) {
    var client
      , err, results;

   if(provider.debug) console.log('dbOperation');

    // sync execution
    async.series({
      acquire     : function(next) {
        if(provider.debug) console.log('get connection from pool');
        
        provider.pool.acquire(function(local_err, conn) {
          if(local_err) err = local_err;
          else { 
            client = conn; 
            next();
          }
        });
      },
      execute     : function(next) {
        if(err) next();

        function queryCallback(local_err, rows) {
          if(local_err) err = local_err;
          results = rows;
          next();
        };

        if(provider.debug) console.log('execute query');
        if(provider.debug) console.log(sql);

        if(params) {
          if(provider.debug) console.log(params);
          client.query(sql, params, queryCallback);
        } else {
          if(provider.debug) console.log('no params');
          client.query(sql, queryCallback);
        }
      },
      release  : function(next) { 
        if(provider.debug) console.log('release connection');

        provider.pool.release(client);

        next();
      },
      end         : function(next) { 
        if(provider.debug) console.log('callback');
        callback(err, results); 
      }
    });
  }

  //--- constructor
  function Provider(table, dbconfig, debug) {
    var self = this;

    if(!dbconfig) {
      dbconfig = {
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'test'
      };
    }

    // define connection to mysql
    this.pool = generic_pool.Pool({
      name: 'mysql',
      max: 10,
      idleTimeoutMillis: 30000,
      log: false,
      create: function(callback) {
        console.log('pool create connection');
        var client = mysql.createConnection(self.dbconfig);
        client.connect();
        callback(null, client);
      },
      destroy: function(client) {
        client.end(function(err) {
          if(!err) client.destroy();
        });
      }
    });

    this.debug = debug ? true : false;
    this.dbconfig = dbconfig;
    this.table = table;
  };

  Provider.prototype.__proto__ = EventEmitter.prototype;

  //--- public
  Provider.prototype.findAll = function(callback) {
    var sql = 'SELECT * FROM ' + this.table;

    return dbOperation(this, callback, sql);
  };

  Provider.prototype.findById = function(id, callback) {
    var sql = 'SELECT * FROM ' + this.table + ' WHERE id = ?';

    function localCallback(err, rows) {
      if(err) return callback(err);
      else return callback(null, rows[0]);
    };

    return dbOperation(this, localCallback, sql, id);
  };

  Provider.prototype.insert = function(item, callback) {
    var sql = 'INSERT INTO ' + this.table + ' SET ?';

    return dbOperation(this, callback, sql, item);
  };

  Provider.prototype.update = function(id, item, callback) {
    var sql = 'UPDATE ' + this.table + ' SET ? WHERE id = ?'
      , params = [item, id];
    ;

    return dbOperation(this, callback, sql, params);
  };

  Provider.prototype.remove = function(id, callback) {
    var sql = 'DELETE FROM ' + this.table + ' WHERE id = ?';

    return dbOperation(this, callback, sql, id);
  };

  Provider.prototype.query = function(sql, values, callback) {
    if(typeof values === 'function') {
      callback = values;
      values = null;
    }

    return dbOperation(this, callback, sql, values);
  };

  Provider.prototype.destroy = function() {
    var self = this;
    if(this.pool) {
      this.pool.drain(function() {
        self.pool.destroyAllNow();
      });
    }
  };
  
  // class definition
  return Provider;
})();

//-----------------------------------------------------------------------------

module.exports = MySqlProvider;