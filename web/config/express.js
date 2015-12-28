'use strict';

var enrouten = require('express-enrouten');
var path = require('path');
var express = require('express');

var directories = {
    route: '/routes',
    public: '/public',
    views: '/views'
};

module.exports = function(app) {
    // static file serving
    app.use('/public', express.static(process.cwd() + directories.public));

    // Set up server-side template rendering.  Templates are files with '.html' extensions, and handlebars is used
    // as the rendering engine.
    app.set('views', process.cwd() + directories.views);
    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);

    // Routes/controllers
    app.use(enrouten({directory: path.join(process.cwd() + directories.route)}));
};
