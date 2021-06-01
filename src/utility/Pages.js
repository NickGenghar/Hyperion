const { HyperionClient } = require('../client/HyperionClient');
const { MessageEmbed, ReactionCollectorOptions } = require('discord.js');

class Pages {
    pages = new MessageEmbed();
    index = 0;
    collector = null;
    serving = '';
    store = null;
    /**
     * 
     * @param {HyperionClient} client The Hyperion client
     * @param {{data:[{title:String,desc:String,thumbnail:String,image:String,color:String,fields:[String,String,?Boolean]}],buttons:String[]}} options Options for Pages
     * @param {ReactionCollectorOptions} collectorOptions The options for the reaction collector.
     */
    constructor(client = undefined, options = {}, collectorOptions = {}) {
        const {
            data = [],
            buttons = []
        } = options;

        this.data = data;
        this.buttons = buttons;
        this.collectorOptions = collectorOptions;

        if(typeof client !== 'undefined') this.client = client;
        if(this.data.length <= 0) throw new Error('Error: Data not provided.');
        if(this.buttons.length <= 0) throw new Error('Error: Buttons not provided.');

        if(this.data[0].title) this.pages.setTitle(this.data[0].title);
        if(this.data[0].desc) this.pages.setDescription(this.data[0].desc);
        if(this.data[0].thumbnail) this.pages.setThumbnail(this.data[0].thumbnail);
        if(this.data[0].image) this.pages.setImage(this.data[0].image);
        if(this.data[0].color) this.pages.setColor(this.data[0].color);
        if(this.data[0].fields) this.pages.addFields(this.data[0].fields);
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
            }, this.collectorOptions);
            this.runner();
            
            this.#addButtons(this.store, this.buttons.map(x => x));
        });
    }

    readNext() {
        ++this.index;
        if(this.index < this.data.length)
            this.#invokeUpdates();
        else
            this.index = this.data.length - 1;

        this.#sweep();
    }

    readPrevious() {
        --this.index;
        if(this.index >= 0)
            this.#invokeUpdates();
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

    #invokeUpdates() {
        //Very ugly, I know... But how am I suppose to invoke the methods dynamically then?
        if(this.data[this.index].title) this.pages.setTitle(this.data[this.index].title);
        if(this.data[this.index].desc) this.pages.setDescription(this.data[this.index].desc);
        if(this.data[this.index].thumbnail) this.pages.setThumbnail(this.data[this.index].thumbnail);
        if(this.data[this.index].image) this.pages.setImage(this.data[this.index].image);
        if(this.data[this.index].color) this.pages.setColor(this.data[this.index].color);
        if(this.data[this.index].fields) this.pages.spliceFields(0,this.pages.fields.length, this.data[this.index].fields ? this.data[this.index].fields : undefined);
    }
}

module.exports = Pages;