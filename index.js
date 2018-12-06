require('dotenv').config();
const mysql = require('mysql');
const util = require('util');
const Car = require('./car');
const User = require('./user');

global.db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

global.db.query = util.promisify(global.db.query);


// Открыть с БД и вывести в консоль сузествующего пользователя с машинами
let car = new Car();
car.load(1);
car.loadAll();

let user = new User();
user.load(1);
user.loadAll();

// Создать нового пользователя

// Изменить имя пользователю

// Удалить пользователя

// Добавить пользователю новую машину
