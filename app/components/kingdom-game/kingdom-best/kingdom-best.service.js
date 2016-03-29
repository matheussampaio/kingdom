(function () {

  angular
    .module(`kingdom`)
    .service(`KingdomBestService`, KingdomBestService);

  function KingdomBestService(KingdomGameService, KingdomUtilsService,
    KingdomAlgorithmsService, _) {
    const service = {
      bestResult: {},
      searchBest: searchBest,
      searchDeep: 3,
      results: []
    };

    return service;

    function searchBest() {
      service.bestResult = {};
      service.results = [];

      bestDeep(KingdomGameService.board);
    }

    function bestDeep(board, moves = [], deep = 0) {
      for (let i = 0; i < KingdomUtilsService.moves.length; i++) {
        const moveResult = KingdomUtilsService.makeMove(board, KingdomUtilsService.moves[i]);

        if (moveResult.valid) {
          const boardMoved = moveResult.board;

          const [y1, x1, y2, x2] = KingdomUtilsService.moves[i];

          KingdomAlgorithmsService.digest({ board: boardMoved })
            .then((result) => {
              if (result.iterations) {
                const movesWithThisIterations = _.cloneDeep(moves);

                movesWithThisIterations.push({
                  from: {
                    x: x1,
                    y: y1
                  },
                  to: {
                    x: x2,
                    y: y2
                  },
                  resources: result.production
                });

                const total = {
                  g: 0, // gold
                  w: 0, // wood
                  h: 0, // hammer
                  p: 0, // person
                  t: 0, // turn
                  s: 0, // sword
                  f: 0  // food
                };

                let score = 0;

                movesWithThisIterations.forEach((move) => {
                  for (let prop in move.resources) {
                    total[prop] += move.resources[prop];
                    score += move.resources[prop];
                  }
                });

                service.results.push({
                  moves: movesWithThisIterations,
                  total,
                  score
                });

                if (deep < 20) {
                  bestDeep(result.board, movesWithThisIterations, deep + 1);
                }
              }
            });
        }
      }
    }
  }

})();
