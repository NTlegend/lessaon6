class Model {

    static load(pk) {
        global.db.query('SELECT * FROM ?? WHERE id = ?', [this.table(), pk], function (error, results) {
            if (error) {
                console.log(error.message);
                throw error;
            }
            console.log(results);
            return results;
        });
    }

    static loadAll() {
        global.db.query('SELECT * FROM ??', this.table(), function (error, results) {
            if (error) {
                console.log(error.message);
                throw error;
            }
            console.log(results);
            return results;
        });
    }

    save(pk = null) {
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
                user_id: pk,
                model: this.model,
                year: this.year
            };
        }

        if (pk === null) {
            const sql = 'INSERT INTO ?? SET ?';
            global.db.query(sql, [table, inserts], function (error, results) {
                if (error) {
                    console.log(error.message);
                    throw error;
                }
                console.log(results.insertId);
                this.pk = results.insertId;
                return results.insertId;
            });
        } else {
            const sql = 'UPDATE ?? SET ? WHERE id = ?';
            global.db.query(sql, [table, inserts, pk], function (error, results) {
                if (error) {
                    console.log(error.message);
                    throw error;
                }
                console.log('changed user id' + pk);
                return pk;
            });
        }
        global.db.end();
    }
}

module.exports = Model;
