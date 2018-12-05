class Model {

    static load(id) {
        const sql = 'SELECT * FROM ?? WHERE id = ?';
        return global.db.query(sql, [this.table(), id])
            .then((results) => {
                console.log(results);
                return results;
            })
            .catch((error) => {
                console.log(error.message);
                throw error;
            });
    }

    static loadAll() {
        const sql = 'SELECT * FROM ??';
        return global.db.query(sql, [this.table()])
            .then((results) => {
                console.log(results);
                return results;
            })
            .catch((error) => {
                console.log(error.message);
                throw error;
            });
    }

    save(id = null) {
        const table = this.constructor.table();
        let inserts = {};

        if (table === 'users') {
            inserts = {
                first_name: this.first_name,
                last_name: this.last_name,
                age: this.age,
                gender: this.gender
            };
        }

        if (table === 'cars') {
            inserts = {
                user_id: this.user_id,
                model: this.model,
                year: this.year
            };
        }

        if (id === null) {
            const sql = 'INSERT INTO ?? SET ?';
            return global.db.query(sql, [table, inserts])
                .then((results) => {
                    console.log('inserted id: ' + results.insertId);
                    this.id = results.insertId;
                    return results;
                })
                .catch((error) => {
                    console.log(error.message);
                    throw error;
                });
        } else {
            const sql = 'UPDATE ?? SET ? WHERE id = ?';
            return global.db.query(sql, [table, inserts, id])
                .then((results) => {
                    console.log('changed id: ' + id);
                    return results;
                })
                .catch((error) => {
                    console.log(error.message);
                    throw error;
                });
        }
    }

    delete(id) {
        const table = this.constructor.table();
        const sql = 'DELETE FROM ?? WHERE id = ?';
        return global.db.query(sql, [table, id])
            .then((results) => {
                console.log(results);
                return results;
            })
            .catch((error) => {
                console.log(error.message);
                throw error;
            });
    }
}

module.exports = Model;
