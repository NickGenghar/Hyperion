const { Client: DiscordClient } = require('discord.js');
const CommandHandler = require('../handlers/CommandHandler');
const EventHandler = require('../handlers/EventHandler');
const PlayerHandler = require('../handlers/PlayerHandler');

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
        this.playerHandler = new PlayerHandler(this);
    }
}

module.exports = HyperionClient;