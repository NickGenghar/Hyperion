const { HyperionClient } = require('../client/HyperionClient');
const { MessageEmbed, MessageCollector } = require('discord.js');

class Pages {
    pages = null;
    /**
     * 
     * @param {any} options Options for Pages
     * @param {HyperionClient} client The Hyperion client
     */
    constructor(options, client) {
        const {} = options = this.options;
        this.client = client;
    }

    set write(p) {
        if(p instanceof MessageEmbed)
        return this.pages = p;

        else throw new Error('Provided parameter is not an instance of MessageEmbed.');
    }

    get read() {
        return this.pages;
    }
}

module.exports = Pages;