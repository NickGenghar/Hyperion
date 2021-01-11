const vibechecker = require('./modules/vibechecker');
const prepper = require('./modules/prepper');
const off = require('./modules/stop');
const print = require('./modules/print');

const message = require('./drivers/message');
const ready = require('./drivers/ready');

const { HyperionClient } = require('../src/hyperion');

const client = new HyperionClient();

client.commandHandler.loadMulti([vibechecker, prepper, off, print]);
client.eventHandler.loadMulti([message, ready]);
client.commandHandler.setPrefix('//');