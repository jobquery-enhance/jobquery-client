app.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('admin.opportunities', {
      abstract: true,
      url: '/opportunities',
      template: '<ui-view/>'
    })
    .state('admin.opportunities.all', {
      url: '',
      templateUrl: '/js/admin/subroutes/opportunities/templates/opportunities.tpl.html',
      controller: 'AdminOpportunitiesCtrl',
      resolve: {
        groups: function(Match) {
          return Match.batchProcess().then(function(data) {
            return data;
          });
        }
      }
    })
    .state('admin.opportunities.new', {
      url: '/new',
      templateUrl: '/js/admin/subroutes/opportunities/templates/new.tpl.html',
      controller: 'AdminOpportunitiesNewCtrl'
    })
    .state('admin.opportunities.detail', {
      url: '/:_id',
      templateUrl: '/js/admin/subroutes/opportunities/templates/detail.tpl.html',
      controller: 'AdminOpportunitiesDetailCtrl',
      resolve: {
        oppData: function($stateParams, OppFactory) {
          return OppFactory.users($stateParams._id).then(function(data) {
            return data;
          });
        }
      }
    })
    .state('admin.opportunities.preview', {
      url: '/:_id',
      templateUrl: '/js/admin/subroutes/opportunities/templates/preview.tpl.html',
      controller: 'AdminOpportunitiesPreviewCtrl'
    });
}]);
