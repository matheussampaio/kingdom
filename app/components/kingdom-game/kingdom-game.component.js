(function () {

  angular
    .module('kingdom')
    .component('kingdomGame', {
      controller: KingdomGameController,
      templateUrl: 'kingdom-game/kingdom-game.html'
    });

  function KingdomGameController(KingdomGameService, KingdomUtilsService) {
    const vm = this;

    vm.KingdomGameService = KingdomGameService;

    vm.order = KingdomUtilsService.order;
    vm.setCells = KingdomGameService.setCells;
    vm.toggleCell = KingdomGameService.toggleCell;
    vm.isSelected = KingdomGameService.isSelected;
  }

})();
