const { BaseCommand } = require('../../src/hyperion');

class Prepper extends BaseCommand {
    constructor() {
        super('ready', {
            dev: true
        });
    }

    run() {
        return console.log('Ready');
    }
}

module.exports = Prepper;