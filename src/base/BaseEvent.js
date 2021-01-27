const { HyperionClient,BaseCommand } = require('../hyperion');

class BaseEvent {
    prefix = '';
    /**
     * @param {String} name The name of the module.
     * @param {HyperionClient} client The hyperion client. As an event module, just reintroduce the client constructor.
     * @param {String[]} entries List of command modules that will be handled by this event driver.
     * @param {String} prefix The prefix provided by the command handler. Use this with a message handler when working with commands.
     */
    constructor(name, client, entries) {
        this.name = name;
        this.client = client;
        this.entries = entries;
    }

    /**
     * @description Returns a list of command modules attached to this event driver.
     * @returns {BaseCommand[]} An array of BaseCommand
     */
    get manager() {
        let placeholder;
        if(!this.entries) throw new Error('Entries not provided. Manager failed to prepare.');
        else if(Array.isArray(this.entries)) {
            placeholder = [];
            this.entries.forEach(entries => {
                placeholder.push(this.client.prototype.commandHandler.commands.get(entries));
            });
        } else {
            placeholder = [this.client.prototype.commandHandler.commands.get(this.entries)];
        }
        return placeholder;
    }

    /**
     * @description The command prefix defined by the command handler.
     * @type {String}
     */
    set prefix() {
        this.prefix = this.client.prototype.commandHandler.prefix;
    }

    /**
     * @description The main execution portion of BaseEvent. Modify this method to have a much more refined control on how you want said events being handled.
     */
    exec() {
        /**
         * @typedef {BaseCommand} managers
         */
        for(let managers of this.manager)
        managers.run();
    }
}

module.exports = BaseEvent;