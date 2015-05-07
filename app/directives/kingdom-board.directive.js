(function () {
    'use strict';

    angular
        .module('kingdom.directives')
        .directive('kingdomBoard', KingdomBoard);

    function KingdomBoard(KingdomGame) {
        return {
            restrict: 'E',
            templateUrl: 'templates/kingdom-board.html',
            scope: {},
            link: function ($scope) {
                $scope.KingdomGame = KingdomGame;
            }
        };
    }

})();
