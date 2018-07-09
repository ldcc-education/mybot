"use strict"

require('./utils/functional');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const util = require('util');
const methodOverride = require('method-override');
const http = require('http');
const fileUpload = require('express-fileupload');
const moment = require('moment-timezone');
const config = require('./config');

global.app = new express();

app.set('port', process.env.PORT || config.server.port);
app.use(fileUpload());
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', config.server.trust_proxy_host);
app.use(express.static(path.join(__dirname, 'image')));
http.createServer(app).listen(app.get('port'), () => {
  console.log(util.format('[Logger]::[Process On]::[Pid:%d]::[Server Running At %d]::[%s]::[Started]',
                            process.pid,
                            config.server.port,
                            moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')));
});
