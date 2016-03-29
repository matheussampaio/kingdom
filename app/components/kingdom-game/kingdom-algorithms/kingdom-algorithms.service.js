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
      return gravity({ board })
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
    }

    function gravity({ board }) {
      const _board = _.cloneDeep(board);

      return new Promise((resolve) => {
        for (let col = 0; col < 8; col++) {
          const colElements = [];

          for (let row = 0; row < 8; row++) {
            if (_board[row][col] !== ``) {
              colElements.push(_board[row][col]);
            }
          }

          while (colElements.length < 8) {
            colElements.unshift(``);
          }

          for (let row = 0; row < 8; row++) {
            _board[row][col] = colElements[row];
          }
        }

        resolve(_board);
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

    function consumeColumn({ board, production = {} }) {
      const _board = _.cloneDeep(board);
      let change = false;
      let start = -1;
      let count = 1;

      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 7; y++) {
          if (_board[y][x] !== `` && _board[y][x] === _board[y + 1][x]) {
            if (start === -1) {
              start = y;
            }
            count++;

          } else {
            if (count >= 3) {
              if (production[_board[y][x]]) {
                production[_board[y][x]] += count;
              } else {
                production[_board[y][x]] = count;
              }

              for (let y2 = start; y2 < start + count; y2++) {
                _board[y2][x] = ``;
              }

              change = true;
            }

            start = -1;
            count = 1;
          }
        }

        const y = 7;

        if (count >= 3) {

          if (production[_board[y][x]]) {
            production[_board[y][x]] += count;
          } else {
            production[_board[y][x]] = count;
          }

          for (let y2 = start; y2 < start + count; y2++) {
            _board[y2][x] = ``;
          }

          change = true;
        }

        start = -1;
        count = 1;
      }

      return Promise.resolve({ change, board: _board, production });
    }

    function consumeRow({ board, production = {} }) {
      const _board = _.cloneDeep(board);
      let change = false;

      // Consume ROW
      let start = -1;
      let count = 1;

      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 7; j++) {
          if (_board[i][j] !== `` && _board[i][j] === _board[i][j + 1]) {
            if (start === -1) {
              start = j;
            }
            count++;

          } else {
            if (count >= 3) {
              if (production[_board[i][j]]) {
                production[_board[i][j]] += count;
              } else {
                production[_board[i][j]] = count;
              }

              for (let k = start; k < start + count; k++) {
                _board[i][k] = ``;
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

          if (production[_board[i][j]]) {
            production[_board[i][j]] += count;
          } else {
            production[_board[i][j]] = count;
          }

          for (let w = start; w < start + count; w++) {
            _board[i][w] = ``;
          }

          change = true;
        }

        start = -1;
        count = 1;
      }

      return Promise.resolve({ change, board: _board, production });
    }
  }

})();
