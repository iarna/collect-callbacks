collect-events
--------------

Aggregate many event emissions into one

Synopsis
--------

    var collect = require('collect-events');

    collect.all( function(event) {
        setTimeout(event(function(){ console.log("two") }),2000);
        setTimeout(event(function(){ console.log("three") }),3000);
    })(function () {
        // This won't execute until both of the timeouts above have completed
    });

    collect.any( function(event) {
        setTimeout(event(function(){ console.log("two") }),2000);
        setTimeout(event(function(){ console.log("three") }),3000);
    })(function () {
        // This will be called as soon as the shorter timer triggers.
        // Note that the longer one will still trigger, just after this is executed.
    });

Description
-----------

Reduce a group of unrelated events into a single event. Either when the
first event is emitted, or after all events have been emitted at least once.

Functions
---------

`var collect = require('collect-events');`

* collect.all( setup[, alldone] )[ -> promisable]

`setup` is a function with a signature of (event) that should setup whatever
event listeners you want to be aggregated into the collection.  The event
argument is a function with a signature of ([listener]) that you should call
to generate event handlers that will be part of this aggregation.  You can
optionally pass through your usual callback function in the listener argument.

collect.all will call alldone (if passed) and fullfill the promisable when
ALL of the events associated with it have triggered at least once.

* collect.any( setup[, alldone] )[ -> promisable]

Like collect.all but it triggers on the first of any of the aggregated
events to complete.

Promisables
-----------

See https://www.npmjs.org/package/promisable

In short, they're compatible with Promises/A+ but they're also functions
that you can pass a callback that will be called in the usual node fashion
of (error, result).

Prior Art
---------

[https://metacpan.org/pod/AnyEvent::Collect](AnyEvent::Collect)
