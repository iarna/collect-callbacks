'use strict';
var collect = require('../collect.js');
var timer = require('timer-ease');
var test = require('tape');

test('Collect with callbacks', function(t) {
    t.plan(6);

    var cnt1 = 0;
    collect.all(function(event) {
        timer.every(200,event(function(){ ++cnt1 })).unref();
        timer.after(500,event(function(){ cnt1 += 10 }));
    },function() {
        t.is( cnt1, 12, "collect.all...cb: Trigger one 500ms event and 2 200ms events before completing");
    });

    var cnt2 = 0;
    collect.any(function(event) {
        timer.every(200,event(function(){ ++cnt2 })).unref();
        timer.after(500,event(function(){ cnt2 += 10 }));
    },function() {
        t.is( cnt2, 1, "collect.any...cb: Trigger only one 200ms events before completing");
    });

    var cnt3 = 0;
    collect.all(function(event) {
        timer.every(200,event(function(){ ++cnt3 })).unref();
        timer.after(500,event(function(){ cnt3 += 10 }));
    })(function() {
        t.is( cnt3, 12, "collect.all...retcall: Trigger one 500ms event and 2 200ms events before completing");
    });

    var cnt4 = 0;
    collect.any(function(event) {
        timer.every(200,event(function(){ ++cnt4 })).unref();
        timer.after(500,event(function(){ cnt4 += 10 }));
    })(function() {
        t.is( cnt4, 1, "collect.any...retcall: Trigger only one 200ms events before completing");
    });

    var cnt5 = 0;
    collect.all(function(event) {
        timer.every(200,event(function(){ ++cnt5 })).unref();
        timer.after(500,event(function(){ cnt5 += 10 }));
    })
    .then(function() {
        t.is( cnt5, 12, "collect.all...promise: Trigger one 500ms event and 2 200ms events before completing");
    });

    var cnt6 = 0;
    collect.any(function(event) {
        timer.every(200,event(function(){ ++cnt6 })).unref();
        timer.after(500,event(function(){ cnt6 += 10 }));
    })
    .then(function() {
        t.is( cnt6, 1, "collect.any...promise: Trigger only one 200ms events before completing");
    });
});
