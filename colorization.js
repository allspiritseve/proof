// Generate a set of colorization functions to colorize console output, or a set
// a no-op functions if the `--monochrome` switch is selected.
module.exports = function (options) {
    if (!options.params.monochrome) {
        options.params.monochrome = false
    }

    function monochrome (text) { return text }

    if (options.params.monochrome) {
        return {
            red: monochrome, green: monochrome, blue: monochrome, gray: monochrome
        }
    }

    function colorize (color) {
        return function (text) { return '' + color + text + '\u001B[0m' }
    }

    return {
        red: colorize('\u001B[31m'),
        green: colorize('\u001B[32m'),
        blue: colorize('\u001B[34m'),
        gray: colorize('\u001B[38;5;244m')
    }
}
