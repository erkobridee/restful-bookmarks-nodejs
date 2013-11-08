angular.module('app').service(

  // service name
  'PaginationService', 

// dependencies injection
['$rootScope', 


// Service Class Definition
(function() {

  // private 
  var $rootScope;

  // private functions
  function defaultMetainf(_pageSize) {
    return {
      pageSize: _pageSize || 10,
      count: 0,
      nextPage: 1,
      lastPage: 0,
      lastPageSize: 0,
      totalPages: 0
    };
  }


  // constructor
  // inject dependencies when instantiate new object
  var ClassDef = function(_rootScope) { 
    $rootScope = _rootScope;
  };


  // public attributes
  ClassDef.prototype.metainf = defaultMetainf();

  // public functions
  ClassDef.prototype.resetPageSize = function(value) {
    this.metainf = defaultMetainf(value);
  };

  //---

  ClassDef.prototype.getPageSize = function() {
    return this.metainf.pageSize;      
  };

  //---

  ClassDef.prototype.setNextPage = function(value) {
    this.metainf.nextPage = value;
  };

  ClassDef.prototype.getNextPage = function() {
    return this.metainf.nextPage; 
  };

  //---

  ClassDef.prototype.updateMetainf = function(count, lastPageSize, lastPage, totalPages) {
    this.metainf.count = count;
    this.metainf.lastPageSize = lastPageSize;
    this.metainf.lastPage = lastPage;
    this.metainf.totalPages = totalPages;
  };

  //--- 

  ClassDef.prototype.addCheck = function() {
    var modFlag = ((this.metainf.count % this.getPageSize()) == 0);

    if(modFlag) {
      this.setNextPage(this.metainf.totalPages+1);
    } else {
      this.setNextPage(this.metainf.totalPages);
    }
  };

  ClassDef.prototype.removeCheck = function() {
    if(
      (this.metainf.page == this.metainf.pages) &&
      (this.metainf.lastPageSize == 1)
    ) {
      var nextPage = this.metainf.totalPages-1;
      if(nextPage <= 0) nextPage = 0;
      this.setNextPage(nextPage);
    }
  };

  //---

  // return class definiton
  return ClassDef;

})()

]);