class EventHandler {
    constructor(client) {
        this.client = client;
    }

    load(eModule) {
        let mod = new eModule(this.client);
        this.client.on(mod.name, (n,o)=>mod.exec(n,o));
    }
}

module.exports = EventHandler;