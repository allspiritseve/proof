#!/usr/bin/env node

require('./proof')(2, function (step, equal, execute, proof) {
    var fs = require('fs')
    var path = require('path')
    var spawn = require('child_process').spawn
    step(function () {
        var stream = fs.createReadStream(__dirname + '/fixtures/unknown-type.out')
        execute(spawn('node', [ proof, 'progress' ]), stream, step)
    }, function (code, stdout, stderr) {
        equal(code, 1, 'non-zero exit')
        equal(stderr, 'error: cannot parse runner output at line 2: unknown line type x\n', 'unknown type')
    })
})
