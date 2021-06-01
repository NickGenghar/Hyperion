const { Collection } = require('discord.js');
const { resolve:ResolvePath } = require('path');

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
        const path = ResolvePath(cModule);
        if(!path) throw new Error(`Module path unresolvable: ${cModule}`);

        const mod = new (require(path))(this.client);
        return this.commands.set(mod.name, mod);
    }

    loadMulti(cModule) {
        for(let mod of cModule) {
            this.load(mod);
        }
    }

    unload(cModule) {
        const path = ResolvePath(cModule);
        if(!path) throw new Error(`Module path unresolvable: ${cModule}`);

        const mod = new (require.cache[require.resolve(path)].exports)();
        if(this.commands.get(mod.name)) {
            this.commands.sweep((v) => v.name == mod.name);
            delete require.cache[require.resolve(path)];
        }
        else throw new Error(`Command module never loaded: ${cModule}`);
    }

    unloadMulti(cModule) {
        for(let mod of cModule) {
            this.unload(mod);
        }
    }

    reload(cModule) {
        const path = ResolvePath(cModule);
        if(!path) throw new Error(`Module path unresolvable: ${cModule}`);

        this.unload(cModule);
        this.load(cModule);
    }

    reloadMulti(cModule) {
        for(let mod of cModule) {
            this.reload(mod);
        }
    }
}

module.exports = CommandHandler;