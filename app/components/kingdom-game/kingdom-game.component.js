(function () {

  angular
    .module(`kingdom`)
    .component(`kingdomGame`, {
      controller: KingdomGameController,
      templateUrl: `kingdom-game/kingdom-game.html`
    });

  function KingdomGameController(KingdomGameService, KingdomCoreService, $rootScope) {
    const vm = this;

    vm.kingdom = KingdomGameService;

    vm.digest = digest;

    ////////////////

    function digest() {
      KingdomCoreService.digest({ board: KingdomGameService.board })
        .then((result) => {
          KingdomGameService.board = result.board;
          $rootScope.$digest();
        });
    }
  }

})();
