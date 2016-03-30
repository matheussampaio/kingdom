(function () {

  class KingdomWorker {
    constructor({ id, url, ondata, onfinish }) {
      this.id = id;
      this.free = true;

      this.ondata = ondata;
      this.onfinish = onfinish;

      this.worker = new Worker(url);

      this.worker.onmessage = (e) => {
        if (e.data.event === `data`) {
          if (this.ondata) {
            this.ondata(e);
          }
        } else if (e.data.event === `end`) {
          this.free = true;
          if (this.onfinish) {
            this.onfinish(e);
          }
        }
      };
    }

    postMessage(msg) {
      if (this.free) {
        this.free = false;

        this.worker.postMessage({
          id: this.id,
          msg: msg
        });
      } else {
        console.error(`worker ${this.id} isn't free!`);
      }
    }
  }

  angular
    .module(`kingdom`)
    .service(`KingdomWorkerFactory`, KingdomWorkerFactory);

  function KingdomWorkerFactory() {
    return KingdomWorker;
  }

})();
