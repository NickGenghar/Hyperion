const { BaseEvent } = require('../../src/hyperion');

class MessageListener extends BaseEvent {
    constructor(client) {
        super('message', client, ['vibecheck', 'off']);
    }

    exec(msg) {
        if(msg.content.startsWith(this.client.commandHandler.prefix))
        this.manager.forEach(item => item.run(msg));
    }
}

module.exports = MessageListener;