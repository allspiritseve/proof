require('../..')(module, function (body, assert) {
    this.initialized = true
    body.call(this, assert)
})
