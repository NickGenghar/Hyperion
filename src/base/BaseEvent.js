class BaseEvent {
    constructor(name, client, entries) {
        this.name = name;
        this.client = client;
        this.entries = entries;
    }

    get manager() {
        let placeholder;
        if(!this.entries) throw new Error('Entries not provided. Manager failed to prepare.');
        else if(Array.isArray(this.entries)) {
            placeholder = [];
            this.entries.forEach(entries => {
                placeholder.push(this.client.commandHandler.commands.get(entries));
            });
        } else {
            placeholder = this.client.commandHandler.commands.get(this.entries);
        }
        return placeholder;
    }

    exec(n,o) {
        if(Array.isArray(this.manager))
        for(let managers of this.manager)
        managers.run(n,o);
        else
        this.manager.run(n,o);
    }
}

module.exports = BaseEvent;