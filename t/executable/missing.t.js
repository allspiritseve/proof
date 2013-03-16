#!/usr/bin/env node

var spawn = require('child_process').spawn, fs = require('fs');

require('./proof')(4, function (step, equal, execute, proof) {
  step(function () {
    fs.readFile(__dirname + '/fixtures/missing-progress.txt', 'utf8', step());
    execute('node', [ proof,  '-M', 't/executable/missing' ], '', step());
  }, function (expected, code, stdout, stderr) {
    equal(code, 1, 'bailed progress exit code');
    equal(stdout.replace(/[\d?]/g, 'X').replace(/\\/g, '/'),
          expected.replace(/\r/g, ''), 'bailed progress message');
    fs.readFile(__dirname + '/fixtures/missing-errors.txt', 'utf8', step());
    var run = spawn('node', [ proof, 'run', 't/executable/missing' ]);
    execute('node', [ proof, 'errors', '-M', 't/executable/missing' ], run.stdout, step());
  }, function (expected, code, stdout, stderr) {
    equal(code, 1, 'bailed errors exit code');
    equal(stdout.replace(/\\/g, '/'), expected.replace(/\r/g, ''), 'bailed errors message');
  });
});
