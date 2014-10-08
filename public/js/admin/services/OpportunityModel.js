app.factory('OpportunityResource', ['$resource', 'SERVER_URL', '$http', function ($resource, SERVER_URL, $http) {
  return $resource(SERVER_URL + '/api/opportunities/:_id', null, {update: {method: 'PUT'}, get: {cache: true}});
}]);

app.factory('Opportunity', ['OpportunityResource', function(OpportunityResource) {
  var opportunityMethods = {};


  opportunityMethods.getAll = function () {
    return OpportunityResource.query().$promise;
  };

  opportunityMethods.check = function() {
    return users;
  };

  opportunityMethods.get = function (id) {
    return OpportunityResource.get({_id: id}).$promise;
  };

  opportunityMethods.create = function (newOpportunity) {
    var opportunity = new OpportunityResource(newOpportunity);
    return opportunity.$save();
  };

  opportunityMethods.update = function (opportunity) {
    return OpportunityResource.update({_id: opportunity._id}, opportunity).$promise;
  };
  return opportunityMethods;
}]);