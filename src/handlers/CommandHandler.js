const { Collection } = require('discord.js');

class CommandHandler {
    prefix = '';
    constructor(client) {
        this.commands = new Collection();
        this.client = client;
    }

    setPrefix(prefix) {
        if(typeof prefix !== 'string') throw new Error(`Prefix type needs to be of type string. Received type "${(typeof prefix)}".`);
        this.prefix = prefix;
    }

    load(cModule) {
        let mod = new cModule(this.client);
        return this.commands.set(mod.name, mod);
    }

    loadMulti(cModule) {
        for(let mod of cModule) {
            this.load(mod);
        }
    }

    unload(cModule) {
        let mod = new cModule();
        if(this.commands.get(mod.name))
        this.commands.sweep((v) => v.name == mod.name);
        else throw new Error('Command module never loaded.');
    }

    unloadMulti(cModule) {
        for(let mod of cModule) {
            this.unload(mod);
        }
    }

    reload(cModule) {
        if(this.commands.get(new (cModule)().name)) {
            this.unload(cModule);
            this.load(cModule);
        } else throw new Error('Command module never loaded.');
    }

    reloadMulti(cModule) {
        for(let mod of cModule) {
            this.reload(mod);
        }
    }
}

module.exports = CommandHandler;