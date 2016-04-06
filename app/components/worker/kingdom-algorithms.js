class Algorithm {
  constructor() {
    this.kingdom = new Kingdom();
    this.utils = new KingdomUtils();
    this.count = 0;
  }

  best({ board, moves = []}) {
    return Promise.all(this.utils.moves.map((move) => {
      const moveResult = this.utils.makeMove(board, move);

      if (moveResult.valid) {
        const boardMoved = moveResult.board;

        const [y1, x1, y2, x2] = move;

        return this.kingdom.digest({ board: boardMoved })
          .then((result) => {
            if (result.iterations > 0) {
              const movesWithThisIterations = JSON.parse(JSON.stringify(moves));

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

              // const total = {
              //   g: 0, // gold
              //   w: 0, // wood
              //   h: 0, // hammer
              //   p: 0, // person
              //   t: 0, // turn
              //   s: 0, // sword
              //   f: 0  // food
              // };
              //
              // let score = 0;
              //
              // movesWithThisIterations.forEach((m) => {
              //   for (let prop in m.resources) {
              //     total[prop] += m.resources[prop];
              //     score += m.resources[prop];
              //   }
              // });

              postMessage({
                event: `data`,
                data: {
                  board: result.board,
                  moves: movesWithThisIterations,
                  // total,
                  // score
                }
              });
            }
          });
      }

      return Promise.resolve();
    }));
  }
}
