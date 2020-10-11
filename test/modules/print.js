const { BaseCommand } = require('../../src/hyperion');

class Printer extends BaseCommand {
    constructor() {
        super('print', {
            dev: true
        });
    }

    run(input) {
        return console.log(`Input: ${input}`);
    }
}

module.exports = Printer;