app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.feed', {
      abstract: true,
      url: '/feed',
      template: '<ui-view/>'
    })
    .state('admin.feed.all', {
      url: '',
      templateUrl: '/js/admin/subroutes/feed/templates/feed.tpl.html',
      controller: 'AdminFeedCtrl'
    })
}]);
