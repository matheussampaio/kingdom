(function () {

  angular
    .module('kingdom')
    .component('kingdomBest', {
      controller: KingdomBestController,
      templateUrl: 'kingdom-best/kingdom-best.html'
    });

  function KingdomBestController(KingdomBestService) {
    const vm = this;

    vm.KingdomBestService = KingdomBestService;
  }

})();
