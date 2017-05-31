angular.module('routeApp')
  .directive('loading', ['$http', function($http) {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        scope.isLoading = function() {
          return $http.pendingRequests.length > 0;
        };
        scope.$watch(scope.isLoading, function(v) {
          if (v) {
            elm.show();
          } else {
            elm.hide();
          }
        });
      }
    };
  }])

.directive('postRepeatDirective', ['$timeout', '$log', 'TimeTracker',
  function($timeout, $log, TimeTracker) {
    return function(scope, element, attrs) {
      if (scope.$last) {
        $timeout(function() {
          let timeFinishedLoadingList = TimeTracker.reviewListLoaded();
          let ref = new Date(timeFinishedLoadingList);
          let end = new Date();
          $log.debug("## DOM rendering list took: " + (end - ref) +
            " ms");
        });
      }
    };
  }
])

    .directive('stringToNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function(value) {
                    return parseFloat(value);
                });
            }
        };
    });

