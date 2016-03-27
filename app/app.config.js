(function () {

  angular.module('kingdom')
    .config(KingdomConfig);

  function KingdomConfig($stateProvider, $urlRouterProvider) {
    const appState = {
      url: '/',
      template: '<app></app>'
    };

    const homeState = {
      url: 'home',
      template: '<home></home>'
    };

    $stateProvider
      .state('app', appState)
        .state('app.home', homeState);

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
  }

})();
