const { VoiceChannel, VoiceConnection } = require('discord.js');

class PlayerHandler {
    /**
     * @param {{channel:VoiceChannel,connection:VoiceConnection,loop:Number,shuffle:Boolean,isPlaying:Boolean,list:String[]}} data
     * @param {*} client 
     */
    constructor(client, data = {}) {
        this.queue = new Map();

        const {
            channel = null,
            connection = null,
            loop = 0,
            shuffle = false,
            isPlaying = false,
            list = []
        } = this.data = data;
        this.client = client;
    }

    create(id, data) {
        if(data) {
            for (let i of Object.keys(this.data))
            if(!data[i]) throw new Error('Error: Incomplete form data for PlayerHandler.');

            return this.queue.set(id, data);
        } else {
            return this.queue.set(id, this.data);
        }
    }

    delete(id) {
        return this.queue.delete(id);
    }

    add(id, newData) {
        let data = this.queue.get(id);
        if(!data) return;

        data.list.push(newData);
        this.queue.set(id, data);
    }

    remove(id, index) {
        let data = this.queue.get(id);
        if(!data) return;

        data.list = data.list.filter((v,i,a) => {return a.indexOf(v) != index});
        this.queue.set(id, data);
    }

    update(id, updatedData) {
        let data = this.queue.get(id);
        if(!data) return;

        for (let i of Object.keys(updatedData)) {
            data[i] = updatedData[i];
        }

        this.queue.set(id, data);
    }

    status(id) {
        return this.queue.get(id);
    }
}

module.exports = PlayerHandler;