(function () {
    'use strict';

    angular
        .module('kingdom.directives')
        .directive('kingdom', Kingdom);

    function Kingdom() {
        return {
            restrict: 'E',
            templateUrl: 'templates/kingdom.html',
            link: function($scope) {
                $scope.game = {
                    board: [
                        ['W', 'S', 'G', 'G', 'T', 'G', 'W', 'G'],
                        ['H', 'F', 'T', 'T', 'S', 'T', 'P', 'W'],
                        ['G', 'S', 'W', 'F', 'H', 'F', 'S', 'H'],
                        ['F', 'H', 'G', 'H', 'W', 'W', 'S', 'P'],
                        ['H', 'G', 'G', 'H', 'H', 'G', 'W', 'S'],
                        ['F', 'G', 'F', 'S', 'W', 'T', 'G', 'G'],
                        ['G', 'T', 'W', 'G', 'P', 'P', 'W', 'F'],
                        ['F', 'W', 'H', 'S', 'T', 'G', 'H', 'W'],
                    ],

                    turns: 100,
                    deep: 1,

                    coef: {
                        gold: 1,
                        wood: 1,
                        food: 1,
                        people: 1,
                        sword: 1,
                        hammer: 1,
                        turn: 1
                    },

                    digest: function () {
                        KingdomGame.digest($scope.game.board, {}, function (board, production) {
                            $scope.game.board = board;
                            $scope.game.production = production;
                        });
                    },

                    consume: function () {
                        KingdomGame.consume($scope.game.board, {}, function (consumeChange, board, production) {
                            if (consumeChange) {
                                $scope.game.board = board;
                                $scope.game.production = production;
                            }
                        });
                    },

                    gravity: function () {
                        KingdomGame.gravity($scope.game.board, function (board) {
                            $scope.game.board = board;
                        });
                    }


                };
            }
        };
    }

})();
