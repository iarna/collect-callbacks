'use strict';
var CondVar = require('cvar');
var Promisable = require('promisable');

var collect = exports;

collect.all = function(collector,cb) {
    var cv = CondVar();
    var args = [], count = 0;
    cv.begin(function(){ this.send(null,args) });
    collector(function(ev){
        var idx = count++;
        cv.begin();
        var ended = false;
        if (ev) {
            return function(){ arg[idx]=arguments; ev.apply(null, arguments); if (ended) return; ended=true; cv.end() }
        }
        else {
            return function(){ args[idx]=arguments; if (ended) return; ended=true; cv.end() }
        }
    });
    cv.end();
    var P = Promisable(cv);
    if (cb) P(cb);
    return P;
}
collect.any = function(collector, cb) {
    var cv = CondVar();
    collector(function(ev){
        if (!ev) return cv.send;
        return function(){ ev.apply(null, arguments); cv.send() }
    });
    var P = Promisable(cv);
    if (cb) P(cb);
    return P;
}
