app.controller('AdminFeedCtrl', ['$scope', '$controller', '$timeout', function ($scope, $controller, $timeout) {
  // We need to pull all feed rows from database
  // foreach row:
  //   get actor object
  //   display action
  //   display target object (category, profile, etc)
  //   figure out how to consolidate these (if multiple objects)
  $scope.feed = [{name: "Chris Oliver", action: "did something", target: "to this object"}];

}]);
