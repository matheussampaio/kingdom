(function () {

  angular
    .module('kingdom')
    .service('KingdomUtilsService', KingdomUtilsService);

  function KingdomUtilsService() {
    const service = {
      makeMove: makeMove,
      getMoves: getMoves,
      copy: copy,
      order: ['w', 's', 'g', 't', 'p', 'h', 'f']
    };

    return service;

    function copy(o) {
      return angular.fromJson(angular.toJson(o));
    }

    function makeMove(board, move) {
      const y1 = move[0];
      const x1 = move[1];
      const y2 = move[2];
      const x2 = move[3];

      const tmp = board[y1][x1];
      board[y1][x1] = board[y2][x2];
      board[y2][x2] = tmp;

      return board;
    }

    function getMoves() {
      return [
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [0, 1, 0, 2],
        [0, 1, 1, 1],
        [0, 2, 0, 3],
        [0, 2, 1, 2],
        [0, 3, 0, 4],
        [7, 6, 7, 7],
        [0, 3, 1, 3],
        [0, 4, 0, 5],
        [0, 4, 1, 4],
        [0, 5, 0, 6],
        [0, 5, 1, 5],
        [0, 6, 0, 7],
        [0, 6, 1, 6],
        [0, 7, 1, 7],
        [1, 0, 1, 1],
        [1, 0, 2, 0],
        [1, 1, 1, 2],
        [1, 1, 2, 1],
        [1, 2, 1, 3],
        [1, 2, 2, 2],
        [1, 3, 1, 4],
        [1, 3, 2, 3],
        [1, 4, 1, 5],
        [1, 4, 2, 4],
        [1, 5, 1, 6],
        [1, 5, 2, 5],
        [1, 6, 1, 7],
        [1, 6, 2, 6],
        [1, 7, 2, 7],
        [2, 0, 2, 1],
        [2, 0, 3, 0],
        [2, 1, 2, 2],
        [2, 1, 3, 1],
        [2, 2, 2, 3],
        [2, 2, 3, 2],
        [2, 3, 2, 4],
        [2, 3, 3, 3],
        [2, 4, 2, 5],
        [2, 4, 3, 4],
        [2, 5, 2, 6],
        [2, 5, 3, 5],
        [2, 6, 2, 7],
        [2, 6, 3, 6],
        [2, 7, 3, 7],
        [3, 0, 3, 1],
        [3, 0, 4, 0],
        [3, 1, 3, 2],
        [3, 1, 4, 1],
        [3, 2, 3, 3],
        [3, 2, 4, 2],
        [3, 3, 3, 4],
        [3, 3, 4, 3],
        [3, 4, 3, 5],
        [3, 4, 4, 4],
        [3, 5, 3, 6],
        [3, 5, 4, 5],
        [3, 6, 3, 7],
        [3, 6, 4, 6],
        [3, 7, 4, 7],
        [4, 0, 4, 1],
        [4, 0, 5, 0],
        [4, 1, 4, 2],
        [4, 1, 5, 1],
        [4, 2, 4, 3],
        [4, 2, 5, 2],
        [4, 3, 4, 4],
        [4, 3, 5, 3],
        [4, 4, 4, 5],
        [4, 4, 5, 4],
        [4, 5, 4, 6],
        [4, 5, 5, 5],
        [4, 6, 4, 7],
        [4, 6, 5, 6],
        [4, 7, 5, 7],
        [5, 0, 5, 1],
        [5, 0, 6, 0],
        [5, 1, 5, 2],
        [5, 1, 6, 1],
        [5, 2, 5, 3],
        [5, 2, 6, 2],
        [5, 3, 5, 4],
        [5, 3, 6, 3],
        [5, 4, 5, 5],
        [5, 4, 6, 4],
        [5, 5, 5, 6],
        [5, 5, 6, 5],
        [5, 6, 5, 7],
        [5, 6, 6, 6],
        [5, 7, 6, 7],
        [6, 0, 6, 1],
        [6, 0, 7, 0],
        [6, 1, 6, 2],
        [6, 1, 7, 1],
        [6, 2, 6, 3],
        [6, 2, 7, 2],
        [6, 3, 6, 4],
        [6, 3, 7, 3],
        [6, 4, 6, 5],
        [6, 4, 7, 4],
        [6, 5, 6, 6],
        [6, 5, 7, 5],
        [6, 6, 6, 7],
        [6, 6, 7, 6],
        [6, 7, 7, 7],
        [7, 0, 7, 1],
        [7, 1, 7, 2],
        [7, 2, 7, 3],
        [7, 3, 7, 4],
        [7, 4, 7, 5],
        [7, 5, 7, 6]
      ];
    }
  }

})();