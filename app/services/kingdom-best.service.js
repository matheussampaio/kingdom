(function () {
    'use strict';

    angular
        .module('kingdom.services')
        .service('KingdomBestService', KingdomBestService);

    function KingdomBestService(KingdomGame, KingdomUtils, KingdomAlgorithms) {
        var service = {
            'bestResult': [],
            'searchBest': searchBest,
            'searchDeep': 1
        };

        return service;

        function searchBest() {
            service.bestResult = [];

            bestDeep(service.searchDeep, KingdomGame.board);
        }

        function bestDeep(deep, board, production={}, pastMoves=[]) {
            for (var i = 0; i < KingdomUtils.getMoves().length; i++) {
                var newboard = KingdomUtils.copy(board);
                var boardMoved = KingdomUtils.makeMove(newboard, KingdomUtils.getMoves()[i]);

                KingdomAlgorithms.digest(boardMoved, KingdomUtils.copy(production), function (newboard, production, changes) {
                    var newmoves = KingdomUtils.copy(pastMoves);
                    newmoves.push(KingdomUtils.getMoves()[i]);

                    if (changes > 0) {
                        if (deep > 1) {
                            bestDeep(deep - 1, newboard, production, newmoves);
                        } else {
                            service.bestResult.push({
                                'moves': newmoves,
                                'production': production
                            });

                        }
                    }
                });
            }
        }
    }



})();
