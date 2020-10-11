const { BaseEvent } = require('../../src/hyperion');

class MessageListener extends BaseEvent {
    constructor(client) {
        super('message', client, ['vibecheck', 'off']);
    }
}

module.exports = MessageListener;