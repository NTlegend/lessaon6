const Model = require('./model');
const Car = require('./car');

class User extends Model {
  static table() {
    return 'users';
  }
  static show(id) {
    if(parseInt(id)) {
      db.query(`SELECT users.id, users.first_name, users.last_name, users.age, users.gender, cars.user_id, cars.model, cars.year FROM users INNER JOIN cars ON users.id = cars.user_id  WHERE users.id=${id}`)
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

  constructor() {
    super();
    this.pk = 'id';
    this.fields = ['id', 'first_name', 'last_name', 'age', 'gender'];
    this.hasMany = [
      {
        model: Car,
        primaryKey: 'id',
        foreignKey: 'user_id'
      }
    ];
  }
}

module.exports = User;
