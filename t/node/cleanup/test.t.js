#!/usr/bin/env node

var fs      = require("fs")
var exec    = require("child_process").exec

var program = __dirname + "/example.sh"

require("../../..")(1, function (step) {
    step([function () {
        fs.unlink(program, step())
    }, function (_, error) {
        if (error && error.code != "ENOENT") throw error
    }])
}, function (step, ok) {
    step(function () {
        fs.writeFile(program, "#!/bin/bash\nexit 1\n", "utf8", step())
    }, function () {
        ok(true, "cleanup")
    })
})
