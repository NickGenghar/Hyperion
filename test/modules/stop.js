const { BaseCommand } = require('../../src/hyperion');

class Off extends BaseCommand {
    constructor() {
        super('off', {
            desc: 'Turn off the bot.',
            usage: '//off',
            dev:true
        });
    }

    run(msg) {
        if(msg.content.startsWith('//off'))
        msg.channel.send('Shutting down...')
        .then(() => {
            return process.exit(0);
        })
    }
}

module.exports = Off;