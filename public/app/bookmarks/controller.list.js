angular.module('app').controller(

  // controller name
  'BookmarksListCtrl',

  // dependencies injection
  ['$rootScope', '$scope', '$location', 'BookmarksResource', 'PaginationService',

// controller definition
function ($rootScope, $scope, $location, resource, pagination) {

  //---

  var config = {
    pageMinSize: 2,
    pageMaxSize: 50,
    showFilterBtnMinlength: 5
  };

  //---

  function updateLocation() {
    $location.path('/bookmarks');
  }

  $rootScope.$on('bookmarks:add:event', function(event, value) {
    event.preventDefault(); event.stopPropagation();
    //console.log('bookmarks:add:event - ' + value);
    pagination.addCheck();
    updateLocation();
  });

  $rootScope.$on('bookmarks:update:event', function(event, value) {
    event.preventDefault(); event.stopPropagation();
    //console.log('bookmarks:add:event - ' + value);
    updateLocation();
  });

  $rootScope.$on('bookmarks:remove:event', function(event, value) {
    event.preventDefault(); event.stopPropagation();
    //console.log('bookmarks:remove:event - ' + value);
    pagination.removeCheck();
    updateLocation();
  });

  //---
  $scope.filter = { search: '' };
  $scope.showFilter = false;

  function checkShowfilterBtn() {
    return ($scope.pageSize < config.showFilterBtnMinlength) ? false : true;
  }

  $scope.showFilterBtn = true; //checkShowfilterBtn();
  $scope.searchText = '';
  $scope.filterBtnLabel = 'Show filter';

  $scope.showFilterBtnClick = function() {
    $scope.showFilter = !$scope.showFilter;
    $scope.filterBtnLabel = ($scope.showFilter ? 'Hide' : 'Show') + ' filter';
    if(!$scope.showFilter) $scope.clearFilter();

    _.delay(function(){
      document.getElementById("searchInputText").focus();
    }, 100);
  }

  $scope.clearFilter = function() {
    $scope.filter = { search: '' };
  }

  $scope.searchBookmarks = function() {
    loadData(pagination.getNextPage(), $scope.filter.search);
  }

  //---

  function loadData(page, searchText) {
    resource.get(
      {
        page: page,
        searchText: searchText,
        size: pagination.getPageSize()
      }, 
      function(result) {
        //console.log(result);
        $scope.bookmarks = result;        

        pagination.updateMetainf(
          result.count,
          result.data.length,
          result.page,
          result.pages
        );

        $scope.showFilterBtn = checkShowfilterBtn();
      }      
    );
  }

  //---
  
  $scope.setPage = function() {
    if((this.n+1) != $scope.bookmarks.page) {
      pagination.setNextPage(this.n+1);
      loadData(pagination.getNextPage(), $scope.filter.search);
    }
  };

  //---

  $scope.pageSize = pagination.getPageSize();
  $scope.pageMinSize = config.pageMinSize;
  $scope.pageMaxSize = config.pageMaxSize;

  $scope.updatePageSizeInvalid = function(pageSize) {
    var flag = false;

    flag = (
      pageSize === undefined || 
      pageSize === null || 
      pageSize === pagination.getPageSize() ||
      pageSize < $scope.pageMinSize ||
      pageSize > $scope.pageMaxSize
    );

    return flag;
  };

  $scope.updatePageSize = function() {
    // check if filter is visible
    if($scope.showFilter) $scope.showFilterBtnClick();

    pagination.resetPageSize($scope.pageSize);
    loadData(pagination.getNextPage(), $scope.filter.search);
  }

  $scope.updatePageSizeFormSubmit = function() {
    if(!$scope.updatePageSizeInvalid($scope.pageSize))
      $scope.updatePageSize();
  }

  //---

  loadData(pagination.getNextPage(), $scope.filter.search);

}]);