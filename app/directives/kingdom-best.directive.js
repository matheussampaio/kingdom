(function () {
    'use strict';

    angular
        .module('kingdom.directives')
        .directive('kingdomBest', KingdomBest);

    function KingdomBest() {
        return {
            restrict: 'E',
            controller: KingdomBestController,
            controllerAs: 'kingdomBestCtrl',
            templateUrl: 'templates/kingdom-best.html'
        };
    }

    function KingdomBestController(KingdomBestService) {
        this.KingdomBestService = KingdomBestService;
    }

})();