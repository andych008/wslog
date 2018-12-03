var express = require('express');
var expressWs = require('express-ws');

var router = express.Router();

const consoles = new Set();

/*
 * WebSocket 示例
 *
 * 你还需要在 app.js 中添加 `expressWs(app);`
 */
router.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    consoles.forEach(consoleWs => {
      consoleWs.send(msg);
    });
    if(msg==='console') {
      consoles.add(ws);
    }
  });

  ws.on("close", function(msg){
    console.log("client is closed");
    if(consoles.has(ws)){
      consoles.delete(ws);
    }
  });
});

module.exports = router;
