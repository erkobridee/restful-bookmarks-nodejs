angular.module('app').service(

  // service name
  'PaginationService', 

// dependencies injection
['$rootScope', 


// Service Class Definition
(function() {

  // private 
  var $rootScope;


  // constructor
  // inject dependencies when instantiate new object
  var ClassDef = function(_rootScope) { 
    $rootScope = _rootScope;
  };


  // public attributes
  ClassDef.prototype.metainf = {
    pageSize: 10,
    count: 0,
    lastPage: 1,
    lastPageSize: 0,
    totalPages: 0
  };

  // public functions
  ClassDef.prototype.resetPageSize = function(value) {
    this.metainf.lastPage = 1;
    this.metainf.pageSize = value;
  };

  //---

  ClassDef.prototype.getPageSize = function() {
    return this.metainf.pageSize;      
  };

  //---

  ClassDef.prototype.setLastPage = function(value) {
    this.metainf.lastPage = value;
  };

  ClassDef.prototype.getLastPage = function() {
    return this.metainf.lastPage; 
  };

  //---

  ClassDef.prototype.updateMetainf = function(count, lastPageSize, totalPages) {
    this.metainf.count = count;
    this.metainf.lastPageSize = lastPageSize;
    this.metainf.totalPages = totalPages;
  };

  //--- 

  ClassDef.prototype.updatePageIndex = function() {
    var pages = Math.ceil(this.metainf.count / this.metainf.pageSize);
    this.metainf.lastPage = pages;
  };

  //---

  // return class definiton
  return ClassDef;

})()

]);