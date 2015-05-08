(function () {
    'use strict';

    angular
        .module('kingdom.services')
        .service('KingdomBestService', KingdomBestService);

    function KingdomBestService(KingdomGameService, KingdomUtilsService, KingdomAlgorithmsService) {
        var service = {
            'bestResult': {},
            'searchBest': searchBest,
            'searchDeep': 1
        };

        return service;

        function searchBest() {
            service.bestResult = {};

            bestDeep(service.searchDeep, KingdomGameService.board, service.bestResult);
        }

        function bestDeep(deep, board, production={}) {
            for (var i = 0; i < KingdomUtilsService.getMoves().length; i++) {
                var tBoard = KingdomUtilsService.copy(board);
                var boardMoved = KingdomUtilsService.makeMove(tBoard, KingdomUtilsService.getMoves()[i]);

                var move = JSON.stringify(KingdomUtilsService.getMoves()[i]);

                KingdomAlgorithmsService.digest(boardMoved, {}, function (pBoard, pResult, pChanges) {

                    if (pChanges > 0) {
                        production.child = production.child ?  production.child : {};
                        production.total = production.total ?  production.total : {};

                        var tTotal = {};

                        for (let e of KingdomUtilsService.order) {
                            let eTotal = production.total[e] ? production.total[e] : 0;
                            let eResult = pResult[e] ? pResult[e] : 0;

                            if (eTotal + eResult > 0) {
                                tTotal[e] = eTotal + eResult;
                            }
                        }

                        production.child[move] = {
                            result: pResult,
                            total: tTotal
                        };

                        if (deep > 1) {
                            bestDeep(deep - 1, pBoard, production.child[move]);
                        }
                    }
                });
            }

            //next(production);
        }
    }

})();
