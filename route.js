const express = require('express');
const router = express.Router();
const util = require('util');
const moment = require('moment');

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
    type: 'buttons',
    buttons: ['Text 응답', '이미지 응답', '버튼형 응답', '이미지 + 버튼형 응답', '시나리오']
  };
  res.json(testJson);
});

router.post('/message', (req, res) => {
  const { user_key, type, content } = req.body;
  const result = {
    message: {
      text: `${content}~~~?`,
      photo: {
        url: "https://mblogthumb-phinf.pstatic.net/MjAxNzEyMDVfMTM0/MDAxNTEyNDQwNTU5MDI4.XEZNrMcevm6OJRrsSu7BnBT_N5RKC7d5w1a1F_bwaC0g.2SHBTee4ourEnsU2ZJ5qQbhtYsGTcrGUccXGEfCivKIg.JPEG.ip7095/a7f1db6695423e998d7346b505801254.jpg?type=w800",
        width: 640,
        height: 320
      }
    }
  }
  log("user_key > ", user_key);
  log("type > ", type);
  log("content > ", content);
  res.json(result);
});

module.exports = router;
