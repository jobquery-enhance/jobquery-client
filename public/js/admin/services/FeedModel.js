app.factory('FeedResource', ['$resource', 'SERVER_URL', function ($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/feed/:_id', null, {update: {method: 'PUT'}});
}]);

app.factory('Feed', ['FeedResource', function (FeedResource) {
  var feedMethods = {};

  feedMethods.getAll = function () {
    return FeedResource.query().$promise;
  };

  feedMethods.get = function (id) {
    return FeedResource.get({_id: id}).$promise;
  };
  return feedMethods;
}]);
