/**
 * Base Command class.
 */
class BaseCommand {
    /**
     * @param {String} name Name of a command module.
     * @param {{locale:String,alias:String|String[],desc:String,usage:String|String[],dev:Boolean,mod:Boolean,activate:Boolean}} param Parameters for the command module.
     */
    constructor(name, param = {}, client) {
        this.name = name;
        this.client = client || null;

        const {
            locale = '',
            alias = [],
            desc = '',
            usage = [],
            dev = false,
            mod = false,
            activate = false
        } = param;

        this.locale = locale;
        this.alias = Array.isArray(alias) ? [this.name].concat(alias) : [this.name, alias];
        this.desc = desc;
        this.usage = Array.isArray(usage) ? usage.join('\n') : usage;
        this.dev = dev;
        this.mod = mod;
        this.activate = activate;
    }

    /**
     * @description The command runner. Please modify this method before using.
     * @returns {void}
     */
    run() {
        throw new Error('Command module not prepared. Please customize this method in order to use it.');
    }
}

module.exports = BaseCommand;