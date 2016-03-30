let algorithm = null;

// proper initialization
if (`function` === typeof importScripts) {
  importScripts(`./kingdom.js`);
  importScripts(`./kingdom-utils.js`);
  importScripts(`./kingdom-algorithms.js`);

  algorithm = new Algorithm();
}

onmessage = function (e) {
  if (algorithm !== null) {
    algorithm.best(e.data.msg.board, e.data.msg.moves).then(() => {
      postMessage({
        event: `end`
      });
    });
  }
};
