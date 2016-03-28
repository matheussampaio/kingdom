(function () {

  angular
    .module('kingdom')
    .service('KingdomAlgorithmsService', KingdomAlgorithmsService);

  function KingdomAlgorithmsService() {
    const service = {
      gravity: gravity,
      consume: consume,
      digest: digest
    };

    return service;

    //////////////////

    function digest(board1, production, next, changes = 0) {
      consume(board1, production, (consumeChange, board2, production2) => {
        if (consumeChange) {
          gravity(board2, (board3) => {
            digest(board3, production2, next, changes + 1);
          });
        } else {
          next(board2, production2, changes);
        }
      });

    }

    function gravity(board, next) {
      for (let col = 0; col < 8; col++) {
        const colElements = [];

        for (let row = 0; row < 8; row++) {
          if (board[row][col] !== '') {
            colElements.push(board[row][col]);
          }
        }

        while (colElements.length < 8) {
          colElements.unshift('');
        }

        for (let i = 0; i < 8; i++) {
          board[i][col] = colElements[i];
        }
      }

      next(board);
    }

    function consume(board, production, next) {
      consumeRow(board, production, (consumeRowChanged, board2, production2) => {
        consumeColumn(board2, production2, (consumeColumnChanged, board3, production3) => {
          next(consumeRowChanged || consumeColumnChanged, board3, production3);
        });
      });
    }

    function consumeColumn(board, production, next) {
      let consumeColumnChanged = false;
      let start = -1;
      let count = 1;

      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 7; j++) {
          if (board[j][i] !== '' && board[j][i] === board[j + 1][i]) {
            if (start === -1) {
              start = j;
            }
            count++;

          } else {
            if (count >= 3) {
              if (production[board[j][i]]) {
                production[board[j][i]] += count;
              } else {
                production[board[j][i]] = count;
              }

              for (let k = start; k < start + count; k++) {
                board[k][i] = '';
              }

              consumeColumnChanged = true;
            }

            start = -1;
            count = 1;
          }
        }

        const j = 7;

        if (count >= 3) {

          if (production[board[j][i]]) {
            production[board[j][i]] += count;
          } else {
            production[board[j][i]] = count;
          }

          for (let w = start; w < start + count; w++) {
            board[w][i] = '';
          }

          consumeColumnChanged = true;
        }

        start = -1;
        count = 1;
      }
      next(consumeColumnChanged, board, production);
    }

    function consumeRow(board, production, next) {
      let consumeRowChanged = false;
      // Consume ROW
      let start = -1;
      let count = 1;

      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 7; j++) {
          if (board[i][j] !== '' && board[i][j] === board[i][j + 1]) {
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
                board[i][k] = '';
              }

              consumeRowChanged = true;
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
            board[i][w] = '';
          }

          consumeRowChanged = true;
        }

        start = -1;
        count = 1;
      }

      next(consumeRowChanged, board, production);
    }
  }

})();
