const { Collection } = require('discord.js');
const { resolve:ResolvePath } = require('path');

class EventHandler {
    constructor(client) {
        this.client = client;
        this.events = new Collection();
    }

    load(eModule) {
        const path = ResolvePath(eModule);
        if(!path) throw new Error(`Module path unresolvable: ${eModule}`);

        let mod = new (require(path))(this.client);
        this.client.on(mod.name, mod.exec.bind(mod));
        return this.events.set(mod.name, mod);
    }

    loadMulti(eModule) {
        for(let mod of eModule) {
            this.load(mod);
        }
    }

    unload(eModule) {
        const path = ResolvePath(eModule);
        if(!path) throw new Error(`Module path unresolvable: ${eModule}`);

        let mod = new (require.cache[require.resolve(path)].exports)();
        let item = this.events.get(mod.name);
        if(item) {
            this.client.removeAllListeners(item.name);
            this.events.sweep((v) => v.name == item.name);
            delete require.cache[require.resolve(path)];
        }
        else throw new Error(`Event module never loaded: ${eModule}`);
    }

    unloadMulti(eModule) {
        for(let mod of eModule) {
            this.unload(mod);
        }
    }

    reload(eModule) {
        const path = ResolvePath(eModule);
        if(!path) throw new Error(`Module path unresolvable: ${eModule}`);

        this.unload(eModule);
        this.load(eModule);
    }

    reloadMulti(eModule) {
        for(let mod of eModule) {
            this.reload(mod);
        }
    }
}

module.exports = EventHandler;