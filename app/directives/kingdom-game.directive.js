(function () {
    'use strict';

    angular
        .module('kingdom.directives')
        .directive('kingdomGame', KingdomGame);

    function KingdomGame() {
        return {
            restrict: 'E',
            templateUrl: 'templates/kingdom-game.html',
            controller: KingdomGameController,
            controllerAs: 'kingdomGameCtrl'
        };
    }

    function KingdomGameController(KingdomGameService) {
        this.KingdomGameService = KingdomGameService;
    }

})();
