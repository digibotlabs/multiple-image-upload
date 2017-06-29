app.config(['$stateProvider', '$urlRouterProvider','$locationProvider','$uiViewScrollProvider',function($stateProvider, $urlRouterProvider,$locationProvider,$uiViewScrollProvider) {

    $uiViewScrollProvider.useAnchorScroll();

    $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'views/app.html',
      controller: 'AppCtrl'      
    })
    .state('app.home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    });
    $urlRouterProvider.otherwise('/app/home');
   
}])