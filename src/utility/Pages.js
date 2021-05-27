const { HyperionClient } = require('../client/HyperionClient');
const { MessageEmbed } = require('discord.js');

class Pages {
    pages = new MessageEmbed();
    index = 0;
    collector = null;
    serving = '';
    store = null;
    /**
     * 
     * @param {any} options Options for Pages
     * @param {HyperionClient} client The Hyperion client
     */
    constructor(options = {}, client = undefined) {
        const {
            data = [],
            buttons = []
        } = options;

        this.data = data;
        this.buttons = buttons;

        if(typeof client !== 'undefined') this.client = client;
        if(this.data.length <= 0) throw new Error('Error: Data not provided.');
        if(this.buttons.length <= 0) throw new Error('Error: Buttons not provided.');

        this.pages.addFields(this.data[0]);
    }

    runner() {
        throw new Error('Error: No runner implemented! Please provide your own implementation of a runner.');
    }

    create(message) {
        this.serving = message.author.id;
        message.channel.send({embed: this.pages})
        .then((msg) => {
            this.store = msg;
            this.collector = this.store.createReactionCollector((r, u) => {
                return typeof this.buttons.find(i => i == r.emoji.name) !== 'undefined' && this.serving == u.id;
            });
            this.runner();
            
            this.#addButtons(this.store, this.buttons.map(x => x));
        });
    }

    readNext() {
        ++this.index;
        if(this.index < this.data.length)
            this.pages.spliceFields(0,this.pages.fields.length,this.data[this.index]);
        else
            this.index = this.data.length - 1;

        this.#sweep();
    }

    readPrevious() {
        --this.index;
        if(this.index >= 0)
            this.pages.spliceFields(0,this.pages.fields.length,this.data[this.index]);
        else
            this.index = 0;

        this.#sweep();
    }

    destroy() {
        return this.collector.stop();
    }

    #sweep() {
        this.store.edit({embed: this.pages})
        .then(async () => {
            const cache = this.store.reactions.cache.filter(r => r.users.cache.has(this.serving));
            try {
                for (const i of cache.values())
                await i.users.remove(this.serving);
            } catch(e) {
                if(e) return;
            }
        })
    }

    #addButtons(message, buttons) {
        message.react(buttons.shift())
        .then(() => {
            if(buttons.length > 0)
            this.#addButtons(message, buttons);
        });
    }
}

module.exports = Pages;