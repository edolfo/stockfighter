var lodash = require('lodash');
var fs = require('fs');

module.exports = function(app) {
    'use strict';

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/ticker/:ticker_id', (req, res) => {
        var path = process.cwd() + '/public/ticker/out' + req.params.ticker_id + '.json';
        var f = JSON.parse(fs.readFileSync(path, 'utf-8'));
        var x = lodash.pluck(f, 'quote.quoteTime');
        var output = [
            {
                x: x,
                y: lodash.pluck(f, 'quote.last'),
                type: 'scatter'
            }
        ];
        res.json(output);
    });
};
