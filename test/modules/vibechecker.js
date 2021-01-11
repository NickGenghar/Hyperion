const { BaseCommand } = require('../../src/hyperion');

class VibeChecker extends BaseCommand {
    constructor() {
        super('vibecheck', {
            locale: __filename,
            alias: ['vibe'],
            desc: 'Use to vibe check the bot for testing purposes...',
            usage: '//vibecheck',
            dev:true
        });
    }

    run(msg) {
        msg.channel.send('Vibe check ok.');
    }
}
module.exports = VibeChecker;