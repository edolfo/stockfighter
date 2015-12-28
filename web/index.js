
var express = require('express');
var app = express();

require('web.config/express')(app);

var server = app.listen(3000, function () {
    'use strict';

    var port = server.address().port;
    console.log('Server up on http://localhost:' + port);
});
