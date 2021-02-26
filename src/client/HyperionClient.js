const { Client: DiscordClient } = require('discord.js');
const CommandHandler = require('../handlers/CommandHandler');
const EventHandler = require('../handlers/EventHandler');

class HyperionClient extends DiscordClient {
    /**
     * 
     * @param {any} options Options for Discord Client
     * @param {any} HyperionOptions Options for Hyperion Client
     */
    constructor(options = {}, HyperionOptions) {
        super(HyperionOptions || options);

        const {developers = []} = options;
        /**
         * @type {import('discord.js').Snowflake}
         */
        this.developers = developers;
        this.commandHandler = new CommandHandler(this);
        this.eventHandler = new EventHandler(this);
    }
}

module.exports = HyperionClient;