'use strict';
var collect = exports;

collect.all = function(collector,cb) {
    var P = new Promise((resolve, reject) => {
        var args = [], count = 0;
        var completed = 0
        collector(function(ev){
            var idx = count++;
            ++completed
            var ended = false;
            if (ev) {
                return function(){ args[idx]=arguments; ev.apply(null, arguments); if (ended) return; ended=true; end() }
            }
            else {
                return function(){ args[idx]=arguments; if (ended) return; ended=true; end() }
            }
        });
        function end () {
          if (--completed === 0) resolve(args)
        }
    });
    return cb ? P.then(v => cb(null, v), cb) : P
}

collect.any = function(collector, cb) {
    var P = new Promise((resolve, reject) => {
        collector(function(ev){
            if (!ev) return resolve();
            return function(){ resolve(ev.apply(null, arguments)); }
        });
    });
    return cb ? P.then(v => cb(null, v), cb) : P;
}
