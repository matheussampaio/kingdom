angular.module("codepen", [])
.controller("codepen", function() {
  this.text = "Hello CodePen!";
})
.directive("kingdom", function(KingdomGame) {
	return {
    restric: 'E',
    scope: {},
    templateUrl: 'templates/kingdom.html',
    link: function ($scope) {
      $scope.game = {
        board : [
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

        digest: function() {
          KingdomGame.digest($scope.game.board, {}, function(board, production) {
            $scope.game.board = board;
            $scope.game.production = production;
          });
        },

        consume: function() {
          KingdomGame.consume($scope.game.board, {}, function(consumeChange, board, production) {
            if (consumeChange) {
              $scope.game.board = board;
              $scope.game.production = production;
            }
          });
        },

        gravity: function() {
          KingdomGame.gravity($scope.game.board, function(board) {
            $scope.game.board = board;
          });
        },

        best: function() {
          $scope.game.bestcontainer = [];

          $scope.game.bestDeep($scope.game.deep, $scope.game.board, {});

          // , function(board, production) {
          //     if (Object.keys(production).length !== 0) {
          //       $scope.game.bestcontainer.push(KingdomGame.moves[i] + ' - ' + JSON.stringify(production));
          //     }
          // });

 
        },

        bestDeep: function(deep, board, production, pastMoves) {
          if (pastMoves === undefined) {
            pastMoves = [];
          }

          for (var i=0; i < KingdomGame.moves.length; i++) {
            var newboard = copy(board);
            var boardMoved = KingdomGame.makeMove(newboard, KingdomGame.moves[i]);

            KingdomGame.digest(boardMoved, copy(production), function(newboard, production, changes) {
              var newmoves = copy(pastMoves);
              newmoves.push(KingdomGame.moves[i])

              if (changes > 0) {
                if (deep > 1) {
                  $scope.game.bestDeep(deep-1, newboard, production, newmoves);
                } else {
                  $scope.game.bestcontainer.push({
                    'moves': newmoves,
                    'production': production
                  });
                }
              }
            });
          }
        }
      };

  	}
  }
}).service('KingdomGame', KingdomGame);
function copy(o) {
  return JSON.parse(JSON.stringify(o));
}
function KingdomGame() {
  var service = {
    'consume' : consume,
    'gravity' : gravity,
    'digest' : digest,
    'moves' : getMoves(),
    'makeMove' : makeMove
  };

  return service;
  

  function digest(board, production, next, changes) {
    console.log('start digest');
    
    if (changes === undefined) {
      changes = 0;
    }

    consume(board, production, function(consumeChange, board, production) {
      if (consumeChange) {
        gravity(board, function(board) {
          digest(board, production, next, changes + 1);
        });
      } else {
        next(board, production, changes);
      }
    });

    console.log('end digest');
  };

  function gravity(board, next) {
    console.log('start gravity');

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

    console.log('end gravity');
    next(board);
  };

  function consume(board, production, next) {
    console.log('start consume');

    consumeRow(board, production, function(consumeRowChanged, board, production) {
      consumeColumn(board, production, function(consumeColumnChanged, board, production) {
        next(consumeRowChanged || consumeColumnChanged, board, production);
      });
    });

    console.log('end consume');
  };

  function consumeColumn(board, production, next) {
    console.log('start consume-column');
    var consumeColumnChanged = false;
    var start = -1;
    var count = 1;
    for (var i=0; i < 8; i++) {
      for (var j=0; j < 7; j++) {
        if (board[j][i] !== '' && board[j][i] === board[j+1][i]) {
          if (start == -1) {
            start = j;
          }
          count++;

        } else {
          if (count >= 3) {
            console.log('production: ' + board[j][i] + ' c: ' + count);
            production[board[j][i]] = production[board[j][i]] === undefined ? count : production[board[j][i]] + count;
            for (var w=start; w < start + count; w++) {
              board[w][i] = '';
            }

            consumeColumnChanged = true;
          }

          start = -1;
          count = 1;
        }
      }

      if (count >= 3) {
        console.log('production: ' + board[j][i] + ' c: ' + count);
        production[board[j][i]] = production[board[j][i]] === undefined ? count : production[board[j][i]] + count;
        for (var w=start; w < start + count; w++) {
          board[w][i] = '';
        }

        consumeColumnChanged = true;
      }

      start = -1;
      count = 1;
    }
    console.log('end consume-column');
    next(consumeColumnChanged, board, production);
  };

  function consumeRow(board, production, next) {
    console.log('start consume-row');

    var consumeRowChanged = false;
    // Consume ROW
    var start = -1;
    var count = 1;
    for (var i=0; i < 8; i++) {
      for (var j=0; j < 7; j++) {
        if (board[i][j] !== '' && board[i][j] === board[i][j+1]) {
          console.log('c:' + i + ',' + j);
          if (start == -1) {
            start = j;
          }
          count++;
      
        } else {
          if (count >= 3) {
          // remove elements and add production
            console.log('production: ' + board[i][j] + ' c: ' + count);
            console.log('l: ' + i + ',' + j);

            production[board[i][j]] = production[board[i][j]] === undefined ? count : production[board[i][j]] + count;

            for (var w=start; w < start + count; w++) {
              board[i][w] = '';
              console.log(i + ',' + w);
            }

            consumeRowChanged = true;
          }

          start = -1;
          count = 1;
        }
      }

      if (count >= 3) {
        // remove elements and add production
          console.log('production: ' + board[i][j] + ' c: ' + count);
          production[board[i][j]] = production[board[i][j]] === undefined ? count : production[board[i][j]] + count;

          for (var w=start; w < start + count; w++) {
            board[i][w] = '';
          }

          consumeRowChanged = true;
        }

        start = -1;
        count = 1;
    }

    console.log('end consume-row');
    
    next(consumeRowChanged, board, production);
  };

  // function best() {
  //   var moves = getMoves();

  //   for (var i=0; i < 2; i++) {
  //     var move = moves[i];
      
  //     var board = makeMove(move);

  //     digest(board);

  //     // debug board:
  //     service.board = board;
  //   }

  //   // for every move
  //     // make that move
  //     // calculate the resources gain
  //     // if its great
  //       // store that move
  // };

  function makeMove(board, move) {
    var x1 = move[1];
    var y1 = move[0];
    var x2 = move[3];
    var y2 = move[2];

    var tmp = board[y1][x1];
    board[y1][x1] = board[y2][x2];
    board[y2][x2] = tmp;

    return board;
  };

  function getMoves() {
    return [[0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 2], [0, 1, 1, 1], [0, 2, 0, 3], [0, 2, 1, 2], [0, 3, 0, 4], [7, 6, 7, 7],
            [0, 3, 1, 3], [0, 4, 0, 5], [0, 4, 1, 4], [0, 5, 0, 6], [0, 5, 1, 5], [0, 6, 0, 7], [0, 6, 1, 6], [0, 7, 1, 7], 
            [1, 0, 1, 1], [1, 0, 2, 0], [1, 1, 1, 2], [1, 1, 2, 1], [1, 2, 1, 3], [1, 2, 2, 2], [1, 3, 1, 4], [1, 3, 2, 3],
            [1, 4, 1, 5], [1, 4, 2, 4], [1, 5, 1, 6], [1, 5, 2, 5], [1, 6, 1, 7], [1, 6, 2, 6], [1, 7, 2, 7], [2, 0, 2, 1],
            [2, 0, 3, 0], [2, 1, 2, 2], [2, 1, 3, 1], [2, 2, 2, 3], [2, 2, 3, 2], [2, 3, 2, 4], [2, 3, 3, 3], [2, 4, 2, 5],
            [2, 4, 3, 4], [2, 5, 2, 6], [2, 5, 3, 5], [2, 6, 2, 7], [2, 6, 3, 6], [2, 7, 3, 7], [3, 0, 3, 1], [3, 0, 4, 0],
            [3, 1, 3, 2], [3, 1, 4, 1], [3, 2, 3, 3], [3, 2, 4, 2], [3, 3, 3, 4], [3, 3, 4, 3], [3, 4, 3, 5], [3, 4, 4, 4],
            [3, 5, 3, 6], [3, 5, 4, 5], [3, 6, 3, 7], [3, 6, 4, 6], [3, 7, 4, 7], [4, 0, 4, 1], [4, 0, 5, 0], [4, 1, 4, 2],
            [4, 1, 5, 1], [4, 2, 4, 3], [4, 2, 5, 2], [4, 3, 4, 4], [4, 3, 5, 3], [4, 4, 4, 5], [4, 4, 5, 4], [4, 5, 4, 6],
            [4, 5, 5, 5], [4, 6, 4, 7], [4, 6, 5, 6], [4, 7, 5, 7], [5, 0, 5, 1], [5, 0, 6, 0], [5, 1, 5, 2], [5, 1, 6, 1],
            [5, 2, 5, 3], [5, 2, 6, 2], [5, 3, 5, 4], [5, 3, 6, 3], [5, 4, 5, 5], [5, 4, 6, 4], [5, 5, 5, 6], [5, 5, 6, 5],
            [5, 6, 5, 7], [5, 6, 6, 6], [5, 7, 6, 7], [6, 0, 6, 1], [6, 0, 7, 0], [6, 1, 6, 2], [6, 1, 7, 1], [6, 2, 6, 3],
            [6, 2, 7, 2], [6, 3, 6, 4], [6, 3, 7, 3], [6, 4, 6, 5], [6, 4, 7, 4], [6, 5, 6, 6], [6, 5, 7, 5], [6, 6, 6, 7],
            [6, 6, 7, 6], [6, 7, 7, 7], [7, 0, 7, 1], [7, 1, 7, 2], [7, 2, 7, 3], [7, 3, 7, 4], [7, 4, 7, 5], [7, 5, 7, 6]];
  };
}