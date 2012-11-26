Ctrl = (function() {
  "use strict";

  function Ctrl() {}

  Ctrl.prototype.Root = function($scope) {

    $scope.metainf = {
      pageSize: 2,
      count: 0,
      lastPage: 0,
      lastPageSize: 0,
      totalPages: 0
    };

    //---

    $scope.getPageSize = function() {
      return $scope.metainf.pageSize;      
    }

    //---

    $scope.setLastPage = function(value) {
      $scope.metainf.lastPage = value;
    }

    $scope.getLastPage = function() {
      return $scope.metainf.lastPage; 
    }

    //---

    $scope.updateMetainf = function(count, lastPageSize, totalPages) {
      $scope.metainf.count = count;
      $scope.metainf.lastPageSize = lastPageSize;
      $scope.metainf.totalPages = totalPages;
    }

    //--- 

    $scope.updatePageIndex = function() {
      var mod = $scope.metainf.count % $scope.metainf.pageSize;
      
      $scope.metainf.lastPage = $scope.metainf.totalPages;
      if(mod !== 0) {
        $scope.metainf.lastPage--;
      } 
    }

  }

  Ctrl.prototype.List = function($scope, BookmarkResource) {
    
    function loadData(page) {
      BookmarkResource.get(
        {
          page: page,
          size: $scope.getPageSize()
        },
        function(res) {
          $scope.bookmarks = res;

          $scope.updateMetainf(
            res.count,
            res.data.length,
            res.pages
          );
      });
    }

    $scope.setPage = function() {
      if(this.n != $scope.bookmarks.page) {
        $scope.setLastPage(this.n);
        loadData($scope.getLastPage());
      }
    }

    loadData($scope.getLastPage());
  }

  Ctrl.prototype.New = function($scope, $location, BookmarkResource) {
	  $scope.bookmark = new BookmarkResource({
	  	"id":0, "name":'', 
	  	"description":'', "url":''
	  });
	  
	  $scope.save = function() {
	  	console.log('save button');
	  	
	  	$scope.bookmark.$save(function(res) {
        $scope.updatePageIndex();
	  		$location.path('/');
	  	});
	  }
  }
  
  Ctrl.prototype.Edit = function(
  	$scope, $routeParams, $window, 
  	$location, BookmarkResource
  ) {
  	BookmarkResource.get({param1: $routeParams.id}, function(res) {
  		$scope.bookmark = res;
  		
  		console.log($scope.bookmark);
  	});
  	
    $scope.save = function() {
    	$scope.bookmark.$update({param1: $routeParams.id}, function(res) {
    			$location.path('/');
    	});
    }
    
    $scope.destroy = function() {
    	var confirm = $window.confirm('Delete '+$scope.bookmark.name+ ' bookmark?');
    	if(confirm) {
    		$scope.bookmark.$delete({param1: $routeParams.id}, function(res) {
    			$location.path('/');
    		});
    	}
    }
  }

  return Ctrl;
})();

var ctrl = new Ctrl();