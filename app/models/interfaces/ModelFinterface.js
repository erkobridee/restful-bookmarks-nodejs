var FInterface = require('../../helpers/FInterface');

var ModelFInterface = new FInterface('ModelFInterface', [
  'list', 'find', 'insert', 'update', 'remove'
]);

module.exports = ModelFInterface;