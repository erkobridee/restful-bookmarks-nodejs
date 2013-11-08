angular.module('app').filter(
  
  // filter name
  'range', 

// filter definition
function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++) {
      input.push(i);
    }
    return input;
  };
});