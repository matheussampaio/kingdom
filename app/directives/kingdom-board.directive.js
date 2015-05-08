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

    function KingdomBoardController(KingdomGame) {
        var order = ['W', 'S', 'G', 'T', 'P', 'H', 'F'];

        this.swap = function (y, x) {
            var currentIndex = order.indexOf(KingdomGame.board[y][x]);
            var nextIndex = (currentIndex + 1) % order.length;
            KingdomGame.board[y][x] = order[nextIndex];
        };

        this.KingdomGame = KingdomGame;
    }

})();
