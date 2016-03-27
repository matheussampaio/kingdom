(function () {

  angular
    .module('kingdom')
    .service('KingdomBestService', KingdomBestService);

  function KingdomBestService(KingdomGameService, KingdomUtilsService, KingdomAlgorithmsService) {
    const service = {
      bestResult: {},
      searchBest: searchBest,
      searchDeep: 1
    };

    return service;

    function searchBest() {
      service.bestResult = {};

      bestDeep(service.searchDeep, KingdomGameService.board, service.bestResult);
    }

    function bestDeep(deep, board, production = {}) {
      for (let i = 0; i < KingdomUtilsService.getMoves()
        .length; i++) {
        const tBoard = KingdomUtilsService.copy(board);
        const boardMoved = KingdomUtilsService.makeMove(tBoard, KingdomUtilsService.getMoves()[i]);

        const move = angular.toJson(KingdomUtilsService.getMoves()[i]);

        KingdomAlgorithmsService.digest(boardMoved, {}, (pBoard, pResult, pChanges) => {

          if (pChanges > 0) {
            production.child = production.child ? production.child : {};
            production.total = production.total ? production.total : {};

            const tTotal = {};

            for (const e of KingdomUtilsService.order) {
              const eTotal = production.total[e] ? production.total[e] : 0;
              const eResult = pResult[e] ? pResult[e] : 0;

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
