var express = require('express');
var amqp = require('amqplib/callback_api')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
      message: 'handling rest products'
  })
});

// make a betting application
router.get('/bet', callD_alembert);

function callD_alembert(req, res) {
  // using spawn instead of exec, prefer a stream over a buffer
  // to avoid maxBuffer issue
  var spawn = require("child_process").spawn;
  var process = spawn('python', ["../api/betting/init.py",
    req.query.funds, // starting funds
    req.query.size, // (initial) wager size
    req.query.count, // wager count — number of wagers per sim
    req.query.sims // number of simulations
  ]);
  process.stdout.on('data', function (data) {
    res.send(data.toString());
  });
}
module.exports = router;