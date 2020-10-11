const vibechecker = require('./modules/vibechecker');
const prepper = require('./modules/prepper');
const off = require('./modules/stop');
const print = require('./modules/print');

const message = require('./drivers/message');
const ready = require('./drivers/ready');

const { HyperionClient } = require('../src/hyperion');

const client = new HyperionClient();

client.commandHandler.loadMulti([vibechecker, prepper, off, print]);
client.eventHandler.load(message);
client.eventHandler.load(ready);

if(false) {
    client.login(require('../../Serv/configurations/token.json').token);
} else {
    client.commandHandler.commands.get('ready').run();
    client.emit('ready');
    client.commandHandler.commands.get('print').run('Test');
    client.destroy();
}