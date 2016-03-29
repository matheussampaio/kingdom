(function () {

  angular.module(`kingdom`)
    .config(KingdomConfig);

  function KingdomConfig($stateProvider, $urlRouterProvider) {
    const appState = {
      url: `/`,
      template: `<app></app>`
    };

    $stateProvider.state(`app`, appState);

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(`/`);
  }

})();
