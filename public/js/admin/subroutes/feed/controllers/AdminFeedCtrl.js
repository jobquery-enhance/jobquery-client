app.controller('AdminFeedCtrl', ['$scope', '$controller', 'Feed',  function ($scope, $controller, Feed) {
  // console.log("Attempting to invoke Feed.getAll()");
  Feed.getAll().then(function(feedItems) {
    var targetType;
    var targetMap = {
      'Category': '/admin/categories/',
      'Company': '/admin/companies/',
      'Opportunity': '/admin/opportunities/',
      'Match': '/admin/matches/',
      'Tag': '/admin/tags',
      'User': '/admin/candidates/'
    };

    $scope.pluralMap = {
      "updated a category": {before: "updated", after: "categories"},
      "created a category": {before: "created", after: "categories"},
      "created a tag": {before: "created", after: "tags"},
      "updated a tag": {before: "updated", after: "tags"},
      "created a company": {before: "created", after: "companies"},
      "updated a company": {before: "updated", after: "companies"},
      "created an opportunity": {before: "created", after: "opportunities"},
      "updated an opportunity": {before: "updated", after: "opportunities"},
      "updated a match": {before: "updated", after: "matches"}
    };

    for (var day in feedItems) {
      for (var user in feedItems[day]['items']) {
        for (var action in feedItems[day]['items'][user]) {
          for (var detail in feedItems[day]['items'][user][action]) {
            feedItems[day]['items'][user][action][detail]['userLink'] = '/admin/candidates/' + feedItems[day]['items'][user][action][detail]['userid'];
            targetType = feedItems[day]['items'][user][action][detail]['targetType'];
            if (targetType === 'Tag') {
              feedItems[day]['items'][user][action][detail]['targetLink'] = targetMap[targetType];
            } else if (targetType === 'Match') {
              // TODO: If no direct link, skip and let template handle it
              // feedItems[day]['items'][user][action][detail]['targetLink'] = targetMap['Opportunity'] + feedItems[day]['items'][user][action][detail]['actionObjectTarget'];
            } else {
              feedItems[day]['items'][user][action][detail]['targetLink'] = targetMap[targetType] + feedItems[day]['items'][user][action][detail]['target'];
            }
          }
        }
      }
    }
    $scope.feeditemdetails = feedItems;
  });

}]);
