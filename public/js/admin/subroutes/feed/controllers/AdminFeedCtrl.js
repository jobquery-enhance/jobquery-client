app.controller('AdminFeedCtrl', ['$scope', '$controller', 'Feed',  function ($scope, $controller, Feed) {
  // console.log("Attempting to invoke Feed.getAll()");
  Feed.getAll().then(function(feedItems) {

    $scope.feeditemdetails = feedItems;
  });

}]);
