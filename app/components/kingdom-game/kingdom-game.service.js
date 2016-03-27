(function () {

  angular
    .module('kingdom')
    .service('KingdomGameService', KingdomGameService);

  function KingdomGameService($localStorage, KingdomAlgorithmsService, _) {
    const service = {
      turns: 100,
      board: [
        ['f', 'g', 'h', 'f', 'h', 'w', 'w', 'f'],
        ['p', 't', 'w', 'f', 'f', 't', 'f', 't'],
        ['t', 't', 'h', 's', 't', 'p', 'w', 't'],
        ['f', 'g', 'h', 'h', 'f', 'h', 'f', 's'],
        ['s', 'p', 'w', 'g', 'f', 't', 'w', 't'],
        ['g', 'p', 's', 'p', 't', 's', 'h', 'g'],
        ['t', 'f', 'f', 'h', 'g', 'g', 't', 'g'],
        ['p', 'f', 's', 't', 'w', 'h', 'p', 't']
      ],
      selected: [],
      production: '',
      digest: digest,
      back: back,
      swap: swap,
      toggleCell: toggleCell,
      setCells: setCells,
      isSelected: isSelected
    };

    activate();

    return service;

    /////////////////

    function activate() {
      $localStorage.$default({
        board: [
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
        ],
        backup: []
      });

      service.board = $localStorage.board;
    }

    function digest() {
      _save();

      KingdomAlgorithmsService.digest(service.board, {}, (board, production) => {
        service.board = board;
        service.production = production;
      });
    }

    function back() {
      if ($localStorage.backup.length) {
        service.board = $localStorage.backup.pop();
      }
    }

    function _save() {
      $localStorage.backup.push(_.cloneDeep(service.board));
    }

    function toggleCell(y, x) {
      if (isSelected(y, x)) {
        _.remove(service.selected, (item) => {
          return item.x === x && item.y === y;
        });
      } else {
        service.selected.push({ x, y });
      }
    }

    function isSelected(y, x) {
      let selected = false;

      for (const item of service.selected) {
        if (item.x === x && item.y === y) {
          selected = true;
        }
      }

      return selected;
    }

    function setCells(type) {
      service.selected.forEach((cell) => {
        service.board[cell.y][cell.x] = type;
      });

      service.selected = [];
    }

    function swap() {
      if (service.selected.length === 2) {
        const c1 = service.selected[0];
        const c2 = service.selected[1];

        const temp = service.board[c1.y][c1.x];
        service.board[c1.y][c1.x] = service.board[c2.y][c2.x];
        service.board[c2.y][c2.x] = temp;

        service.selected = [];
      }
    }

  }

})();
