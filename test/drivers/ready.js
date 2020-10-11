const { BaseEvent } = require("../../src/hyperion");

class ReadyListener extends BaseEvent {
    constructor(client) {
        super('ready', client, 'ready');
    }
}

module.exports = ReadyListener