'use strict';
/* global $ */
/* global Plotly */

// $.getJSON('/public/ticker/out.json')
$.getJSON('/ticker/2')
.done(function(data){
    console.log(data);
    Plotly.newPlot('data', data);
}).fail(function(err){
    console.log('fail');
    console.error(err);
});
