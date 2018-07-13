const express = require('express');
const router = express.Router();
const util = require('util');
const moment = require('moment');
const { basic } = require('../scenario/message');
const { getValue, setValue } = require('./redis');
const flow = require('../scenario/flow');

router.use((req, res, next) => {
  console.log(util.format('[Logger]::[Route]::[Access URL %s]::[Access Ip %s]::[Access Time %s]',
                              req.originalUrl,
                              req.ip,
                              moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
                          ));
  next();
});

router.get('/keyboard', (req, res) => {
  res.json(basic);
});

router.post('/message', (req, res) => {
  const { user_key, content } = req.body;
  go(user_key,
    getValue,
    value => flow(user_key, content, value),
    msg => res.json(msg)
  );
});

module.exports = router;
