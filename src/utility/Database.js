const fs = require('fs').promises;

class Database {
    #data = new Map;
    constructor(file, size, time) {
        this.file = file;
        this.dbSize = size;
        this.time = time;

        fs.readFile(this.file, 'utf-8')
        .catch(e => {
            if(e) {
                fs.appendFile(this.file, '', 'utf-8');
            }
        })
    }

    Set(key, value) {
        this.sweep();
        this.#data.set(key, value);
        return;
    }

    Get(key) {
        let data = this.#data.get(key);
        if(typeof data === 'undefined') {
            this.sweep(true);
            fs.readFile(this.file, 'utf-8')
            .then(i => {
                i = JSON.parse(i);
                if(typeof i === 'object' && !Array.isArray(i)) {
                    if(typeof i[key] !== 'undefined') {
                        this.#data.set(key, i[key]);
                        data = this.#data.get(key);
                        delete i[key];

                        for (let [k, v] of Object.entries(i)) {
                            this.#data.set(k,v);
                            if(this.#data.size >= this.dbSize) break;
                        }
                    } else {
                        data = '';
                    }
                }
            })
        }

        return data;
    }

    Delete(key) {
        if(this.#data.has(key)) this.#data.delete(key);
        fs.readFile(this.file, {encoding:'utf-8',flag:'r+'})
        .then(i => {
            i = JSON.parse(i);
            if(typeof i === 'object' && !Array.isArray(i)) {
                delete i[key];
            }
            fs.writeFile(this.file, JSON.stringify(i), 'utf-8')
            .catch(e => {
                throw e;
            });
        })
        .catch(e => {
            throw e;
        });

        return;
    }

    get size() {
        return this.#data.size;
    }

    sweep(override = false) {
        if(this.#data.size >= this.dbSize || override) {
            fs.readFile(this.file, {encoding:'utf-8',flag:'r+'})
            .then(i => {
                i = JSON.parse(i);
                if(typeof i === 'object' && !Array.isArray(i)) {
                    for (let [k, v] of this.#data) {
                        i[k] = v;
                    }
                    fs.writeFile(this.file, JSON.stringify(i), 'utf-8')
                    .catch(e => {
                        throw e;
                    });
                }
            })
            .catch(e => {
                throw e;
            });
        }
    }
}

module.exports = Database;