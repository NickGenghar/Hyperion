const { Collection } = require('discord.js');

class EventHandler {
    constructor(client) {
        this.client = client;
        this.events = new Collection();
    }

    load(eModule) {
        let mod = new eModule(this.client);
        this.client.on(mod.name, mod.exec.bind(mod));
    }

    loadMulti(eModule) {
        for(let mod of eModule) {
            this.load(mod);
        }
    }

    unload(eModule) {
        let mod = new eModule();
        if(this.events.get(mod.name)) {
            this.client.off(mod.name, mod.exec.bind(mod));
            this.events.sweep((v) => v.name == mod.name);
        }
        else throw new Error('Event module never loaded.');
    }

    unloadMulti(eModule) {
        for(let mod of eModule) {
            this.unload(mod);
        }
    }

    reload(eModule) {
        if(this.events.get(new (eModule)().name)) {
            this.unload(eModule);
            this.load(eModule);
        } else throw new Error('Event module never loaded.');
    }

    reloadMulti(eModule) {
        for(let mod of eModule) {
            this.reload(mod);
        }
    }
}

module.exports = EventHandler;