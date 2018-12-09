class Model {
    get(id) {
        const table = this.constructor.table();
        this.pk = id;



        let queryVal = [];

        db.query(`SELECT * FROM ${table} WHERE id = ${this.pk}`)
            .then( results => {
                console.log(results);

                return results;
            })
            .catch( err => {
                console.log(err);
            });
    }
    save() {
        const table = this.constructor.table();

        try {
            db.query(`INSERT INTO ${table} SET ?`, this.fields)
                .then( results => {
                    this.pk = results.insertId;
                    console.log(this.pk);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        catch (err) {
            console.log(`An error occurred ${err}`);
        }

    }
    update() {
        const table = this.constructor.table(),
            pk = this.pk,
            fieldsToUpdate = this.fields;

        try {
            if(parseInt(pk)) {
                db.query(`UPDATE ${table} SET ? WHERE ${table}.id=${pk}`, fieldsToUpdate)
                    .then( results => {
                        console.log('Successfully updated');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else {
                console.log('You must set pk to delete!');
            }
        }
        catch (err) {
            console.log(`An error occurred ${err}`);
        }

    }

    delete() {
        const table = this.constructor.table(),
            pk = this.pk;

        try {
            if(parseInt(pk)) {
                db.query(`DELETE FROM ${table} where id=${pk}`)
                    .then( results => {
                        console.log(results);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else {
                console.log('You must set pk to delete!');
            }
        }
        catch (err) {
            console.log(`An error occurred ${err}`);
        }
    }



}

module.exports = Model;