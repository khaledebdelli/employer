angular.module('routeApp').filter('record', function() {
    return function(array, property, target) {
      if (target && property) {
        target[property] = array;
      }
      return array;
    }
  }).filter('myDate', function($filter) {
    var angularDateFilter = $filter('date');
    return function(theDate) {
      return angularDateFilter(theDate, 'dd MM yyyy @ HH:mm:ss');
    }
  })
  .filter('capitalize', function() {
    return function(input, scope) {
      if (input != null)
        input = input.toLowerCase();
      return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
  });
