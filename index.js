require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

global.db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

global.db.query = util.promisify(global.db.query);



const User = require('./user');





// User.show(21);

// const newUser = new User();
// newUser.get(1);

// const newUser = new User();
// newUser.fields = {
//   'first_name': 'John',
//   'last_name': 'Hello',
//   'age': 30,
//   'gender': 'F'
// };
// newUser.save();


// const updatedUser = new User();
// updatedUser.pk = 22;
// updatedUser.fields = {
//   'first_name': "Boris",
//   'last_name': 'Alexandrow'
// };
// updatedUser.update();

// const deletedUser = new User();
//   deletedUser.pk = 22;
//   deletedUser.delete();



// const userPk = 21;
// const userNewCar = new User();
// userNewCar.pk = userPk;
// const newCar = new userNewCar.hasMany[0].model();
// newCar.fields = {
//   'user_id': userPk,
//   'model': 'Audi Q-7',
//   'year': 2017
// };
// newCar.save();

// setTimeout(() => console.log(newCar), 100);


// Открыть с БД и вывести в консоль существующего пользователя с машинами +

// Создать нового пользователя +

// Изменить имя пользователю +

// Удалить пользователя +

// Добавить пользователю новую машину +
