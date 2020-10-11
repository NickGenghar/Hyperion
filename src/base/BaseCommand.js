class BaseCommand {
    constructor(name, options = {}) {
        this.name = name;

        const {
            locale = '',
            alias = [],
            desc = '',
            usage = [],
            dev = false,
            mod = false,
            activate = false
        } = options;

        this.locale = locale;
        this.alias = Array.isArray(alias) ? [this.name].concat(alias) : [this.name, alias];
        this.desc = desc;
        this.usage = Array.isArray(usage) ? usage.join('\n') : usage;
        this.dev = dev;
        this.mod = mod;
        this.activate = activate;
    }

    /**
     * @param {import('discord.js').Message} msg
     * @param {Array<String>} args
     * @param {Map|import('discord.js').Collection} col
     * @returns {Promise<import('discord.js').Message>}
     */
    run() {
        throw new Error('Command module not prepared. Please customize this method in order to use it.');
    }
}

module.exports = BaseCommand;