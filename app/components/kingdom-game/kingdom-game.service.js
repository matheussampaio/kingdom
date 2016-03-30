(function () {

  angular
    .module(`kingdom`)
    .service(`KingdomGameService`, KingdomGameService);

  function KingdomGameService($localStorage, $rootScope, _, KingdomWorkerFactory) {
    const _workers = [];
    const service = {
      count: 0,
      board: [
        [`f`, `g`, `h`, `f`, `h`, `w`, `w`, `f`],
        [`p`, `t`, `w`, `f`, `f`, `t`, `f`, `t`],
        [`t`, `t`, `h`, `s`, `t`, `p`, `w`, `t`],
        [`f`, `g`, `h`, `h`, `f`, `h`, `f`, `s`],
        [`s`, `p`, `w`, `g`, `f`, `t`, `w`, `t`],
        [`g`, `p`, `s`, `p`, `t`, `s`, `h`, `g`],
        [`t`, `f`, `f`, `h`, `g`, `g`, `t`, `g`],
        [`p`, `f`, `s`, `t`, `w`, `h`, `p`, `t`]
      ],
      types: [`w`, `s`, `g`, `t`, `p`, `h`, `f`],
      selected: [],
      results: [],
      best: best,
      digest: digest,
      back: back,
      swap: swap,
      stop: stop,
      searching: false,
      toggleCell: toggleCell,
      setCells: setCells,
      isSelected: isSelected,


      consume: []
    };

    activate();

    return service;

    /////////////////

    function activate() {
      _initWorkes();

      $localStorage.$default({
        board: [
          [`w`, `w`, `w`, `w`, `w`, `w`, `w`, `w`],
          [`w`, `w`, `w`, `w`, `w`, `w`, `w`, `w`],
          [`w`, `w`, `w`, `w`, `w`, `w`, `w`, `w`],
          [`w`, `w`, `w`, `w`, `w`, `w`, `w`, `w`],
          [`w`, `w`, `w`, `w`, `w`, `w`, `w`, `w`],
          [`w`, `w`, `w`, `w`, `w`, `w`, `w`, `w`],
          [`w`, `w`, `w`, `w`, `w`, `w`, `w`, `w`],
          [`w`, `w`, `w`, `w`, `w`, `w`, `w`, `w`]
        ],
        backup: []
      });

      service.board = $localStorage.board;
    }

    function _initWorkes(max = 5) {
      for (let i = 0; i < max; i++) {
        _workers.push(new KingdomWorkerFactory({
          id: i,
          url: `app/components/worker/worker.js`,
          ondata: (e) => {
            service.results.push(e.data.data);
            service.consume.push(e.data.data);
          },
          onfinish: () => {
            $rootScope.$digest();
            _more();
          }
        }));
      }
    }

    function stop() {
      service.searching = false;
    }

    function _more() {
      if (!service.searching) {
        console.log(`stop!`);
      } else if (service.consume.length === 0) {
        service.searching = false;
        console.log(`noting more to consume`);
      } else if (service.count++ >= 100000) {
        service.searching = false;
        console.log(`breaking more, count >= 100000`);
      } else {
        const worker = _getFreeWorker();

        if (worker) {
          const r = service.consume.shift();

          service.moveslength = r.moves.length;

          worker.postMessage({
            board: r.board,
            moves: r.moves
          });

          _more();
        }
      }
    }

    function _getFreeWorker() {
      for (const worker of _workers) {
        if (worker.free) {
          return worker;
        }
      }

      return null;
    }

    function best() {
      service.searching = true;
      service.consume = [];
      service.results = [];
      service.count = 0;

      const worker = _getFreeWorker();

      if (worker) {
        worker.postMessage({
          board: service.board
        });
      }
    }

    function digest() {
      // TODO: digest
      console.log("TODO");
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

      _save();
    }

    function swap() {
      if (service.selected.length === 2) {
        const c1 = service.selected[0];
        const c2 = service.selected[1];

        const temp = service.board[c1.y][c1.x];
        service.board[c1.y][c1.x] = service.board[c2.y][c2.x];
        service.board[c2.y][c2.x] = temp;

        service.selected = [];

        _save();
      }
    }

  }

})();
