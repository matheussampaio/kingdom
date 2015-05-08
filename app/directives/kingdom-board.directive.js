(function () {
    'use strict';

    angular
        .module('kingdom.directives')
        .directive('kingdomBoard', KingdomBoard);

    function KingdomBoard() {
        return {
            restrict: 'E',
            controller: KingdomBoardController,
            controllerAs: 'kingdomBoardCtrl',
            templateUrl: 'templates/kingdom-board.html'
        };
    }

    function KingdomBoardController(KingdomGameService, KingdomUtilsService) {
        this.order = KingdomUtilsService.order;

        this.swap = (y, x) => {
            var currentIndex = this.order.indexOf(KingdomGameService.board[y][x]);
            var nextIndex = (currentIndex + 1) % this.order.length;
            KingdomGameService.board[y][x] = this.order[nextIndex];
        };

        this.KingdomGameService = KingdomGameService;
    }

})();
