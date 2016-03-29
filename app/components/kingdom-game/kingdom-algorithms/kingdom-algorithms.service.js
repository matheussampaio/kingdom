(function () {

  angular
    .module(`kingdom`)
    .service(`KingdomAlgorithmsService`, KingdomAlgorithmsService);

  function KingdomAlgorithmsService(_) {
    const service = {
      gravity: gravity,
      consume: consume,
      digest: digest,
      consumeRow: consumeRow,
      consumeColumn: consumeColumn
    };

    return service;

    //////////////////

    function digest({ board, production = {}, iterations = 0 }) {
      return gravity(board)
        .then((boardGravity) => {
          return consume({ board: boardGravity, production });
        })
        .then((result) => {
          result.iterations = iterations;

          if (result.change) {
            result.iterations++;
            return digest(result);
          }

          return Promise.resolve(result);
        });


      // return new Promise((resolve) => {
      //   consume({ board, production })
      //     .then((result) => {
      //       if (result.change) {
      //         gravity(result.board)
      //           .then((boardGravity) => {
      //             return digest(boardGravity, result.production);
      //           })
      //           .then(resolve);
      //       }
      //
      //       resolve(result);
      //     });
      // });
    }

    function gravity(board) {
      const tmpBoard = _.cloneDeep(board);

      return new Promise((resolve) => {
        for (let col = 0; col < 8; col++) {
          const colElements = [];

          for (let row = 0; row < 8; row++) {
            if (board[row][col] !== ``) {
              colElements.push(board[row][col]);
            }
          }

          while (colElements.length < 8) {
            colElements.unshift(``);
          }

          for (let row = 0; row < 8; row++) {
            tmpBoard[row][col] = colElements[row];
          }
        }

        resolve(tmpBoard);
      });
    }

    function consume({ board, production }) {
      let rowChange = false;

      return new Promise((resolve) => {
        consumeRow({ board, production })
          .then((result) => {
            rowChange = result.change;
            return consumeColumn(result);
          })
          .then((result) => {
            result.change = result.change || rowChange;
            return resolve(result);
          });
      });
    }

    function consumeColumn({ board, production }) {
      const tmpBoard = _.cloneDeep(board);
      let change = false;
      let start = -1;
      let count = 1;

      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 7; y++) {
          if (board[y][x] !== `` && board[y][x] === board[y + 1][x]) {
            if (start === -1) {
              start = y;
            }
            count++;

          } else {
            if (count >= 3) {
              if (production[board[y][x]]) {
                production[board[y][x]] += count;
              } else {
                production[board[y][x]] = count;
              }

              for (let y2 = start; y2 < start + count; y2++) {
                tmpBoard[y2][x] = ``;
              }

              change = true;
            }

            start = -1;
            count = 1;
          }
        }

        const y = 7;

        if (count >= 3) {

          if (production[board[y][x]]) {
            production[board[y][x]] += count;
          } else {
            production[board[y][x]] = count;
          }

          for (let y2 = start; y2 < start + count; y2++) {
            tmpBoard[y2][x] = ``;
          }

          change = true;
        }

        start = -1;
        count = 1;
      }

      return Promise.resolve({ change, board: tmpBoard, production });
    }

    function consumeRow({ board, production = {} }) {
      const tmpBoard = _.cloneDeep(board);
      let change = false;

      // Consume ROW
      let start = -1;
      let count = 1;

      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 7; j++) {
          if (board[i][j] !== `` && board[i][j] === board[i][j + 1]) {
            if (start === -1) {
              start = j;
            }
            count++;

          } else {
            if (count >= 3) {
              if (production[board[i][j]]) {
                production[board[i][j]] += count;
              } else {
                production[board[i][j]] = count;
              }

              for (let k = start; k < start + count; k++) {
                tmpBoard[i][k] = ``;
              }

              change = true;
            }

            start = -1;
            count = 1;
          }
        }

        const j = 7;

        if (count >= 3) {
          // remove elements and add production

          if (production[board[i][j]]) {
            production[board[i][j]] += count;
          } else {
            production[board[i][j]] = count;
          }

          for (let w = start; w < start + count; w++) {
            tmpBoard[i][w] = ``;
          }

          change = true;
        }

        start = -1;
        count = 1;
      }

      return Promise.resolve({ change, board: tmpBoard, production });
    }
  }

})();
