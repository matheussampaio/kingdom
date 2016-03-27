(function () {

  angular
    .module('kingdom')
    .component('kingdomGame', {
      controller: KingdomGameController,
      templateUrl: 'kingdom-game/kingdom-game.html'
    });

  function KingdomGameController(KingdomGameService) {
    const vm = this;

    vm.KingdomGameService = KingdomGameService;
  }

})();
