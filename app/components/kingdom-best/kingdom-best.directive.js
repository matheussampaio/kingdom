(function () {

  angular
    .module('kingdom')
    .directive('kingdomBest', KingdomBest);

  function KingdomBest() {
    return {
      restrict: 'E',
      controller: KingdomBestController,
      controllerAs: 'kingdomBestCtrl',
      templateUrl: 'kingdom-best/kingdom-best.html'
    };
  }

  function KingdomBestController(KingdomBestService) {
    this.KingdomBestService = KingdomBestService;
  }

})();
