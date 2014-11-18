var requirejs = require('requirejs');

// list all the tests to be run
var specs = [
    './spec/ShippingForm.spec',
]

// set up require.js to play nicely with the test environment
requirejs.config({
    baseUrl: './js/app',
    nodeRequire: require,
});

// make define available globally like it is in the browser
global.define = require('requirejs');
jasmine = require('jasmine-node');

// map jasmine methods to global namespace
for (key in jasmine) {
    if (jasmine[key] instanceof Function) {
        global[key] = jasmine[key];
    }
};

var exitCode = 0;
process.on('uncaughtException', function(e) {
    console.error(e.stack || e);
    exitCode = 1;
    process.exit(exitCode);
});

process.on("exit", onExit);

function onExit() {
    process.removeListener("exit", onExit);
    process.exit(exitCode);
}

// require specs and run them with Jasmine as soon as they're loaded
requirejs(specs, function () {

    jasmine.getEnv().addReporter(new jasmine.TerminalVerboseReporter({
        color: true,
        includeStackTrace: true
    }));

    // execute all specs
    jasmine.getEnv().execute();
});

