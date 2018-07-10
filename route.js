const express = require('express');
const router = express.Router();
const util = require('util');
const moment = require('moment');

const { respondJson, respondOnError } = require('./utils/respond');
const resultCode = require('./utils/respond');

router.use((req, res, next) => {
  console.log(util.format('[Logger]::[Route]::[Access URL %s]::[Access Ip %s]::[Access Time %s]',
                              req.originalUrl,
                              req.ip,
                              moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
                          ));
  next();
});

router.get('/keyboard', (req, res) => {
  const testJson = {
    type: 'button',
    button: ['대화하기']
  };
  res.json(testJson);
});

router.post('/message', (req, res) => {

});

module.exports = router;
