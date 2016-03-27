(function () {

  angular
    .module('kingdom')
    .service('KingdomAlgorithmsService', KingdomAlgorithmsService);

  function KingdomAlgorithmsService() {
    var service = {
      'gravity': gravity,
      'consume': consume,
      'digest': digest
    };

    return service;

    function digest(board, production, next, changes = 0) {
      consume(board, production, function (consumeChange, board, production) {
        if (consumeChange) {
          gravity(board, function (board) {
            digest(board, production, next, changes + 1);
          });
        } else {
          next(board, production, changes);
        }
      });

    }

    function gravity(board, next) {
      for (var col = 0; col < 8; col++) {
        var colElements = [];
        for (var row = 0; row < 8; row++) {
          if (board[row][col] !== '') {
            colElements.push(board[row][col]);
          }
        }

        while (colElements.length < 8) {
          colElements.unshift('');
        }

        for (var i = 0; i < 8; i++) {
          board[i][col] = colElements[i];
        }
      }

      next(board);
    }

    function consume(board, production, next) {
      consumeRow(board, production, function (consumeRowChanged, board, production) {
        consumeColumn(board, production, function (consumeColumnChanged, board, production) {
          next(consumeRowChanged || consumeColumnChanged, board, production);
        });
      });
    }

    function consumeColumn(board, production, next) {
      var consumeColumnChanged = false;
      var start = -1;
      var count = 1;
      for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 7; j++) {
          if (board[j][i] !== '' && board[j][i] === board[j + 1][i]) {
            if (start === -1) {
              start = j;
            }
            count++;

          } else {
            if (count >= 3) {
              production[board[j][i]] = production[board[j][i]] === undefined ? count : production[board[j][i]] + count;
              for (var k = start; k < start + count; k++) {
                board[k][i] = '';
              }

              consumeColumnChanged = true;
            }

            start = -1;
            count = 1;
          }
        }

        if (count >= 3) {
          production[board[j][i]] = production[board[j][i]] === undefined ? count : production[board[j][i]] + count;
          for (var w = start; w < start + count; w++) {
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
      var consumeRowChanged = false;
      // Consume ROW
      var start = -1;
      var count = 1;
      for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 7; j++) {
          if (board[i][j] !== '' && board[i][j] === board[i][j + 1]) {
            if (start === -1) {
              start = j;
            }
            count++;

          } else {
            if (count >= 3) {
              production[board[i][j]] = production[board[i][j]] === undefined ? count : production[board[i][j]] + count;

              for (var k = start; k < start + count; k++) {
                board[i][k] = '';
              }

              consumeRowChanged = true;
            }

            start = -1;
            count = 1;
          }
        }

        if (count >= 3) {
          // remove elements and add production
          production[board[i][j]] = production[board[i][j]] === undefined ? count : production[board[i][j]] + count;

          for (var w = start; w < start + count; w++) {
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
