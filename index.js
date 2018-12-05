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

// Открыть с БД и вывести в консоль суествующего пользователя с машинами
//User.load(1);
//User.loadAll();

// Создать нового пользователя
const user = new User();
user.first_name = 'Ivan';
user.last_name = 'Fedorov';
user.age = '42';
user.gender = 'M';

const userPromise = user.save();

userPromise.then((res) => {
    // Изменить имя пользователю
    user.first_name = 'Dmitriy';
    user.save(user.id);
    return res;
});

// Добавить пользователю новую машину
userPromise.then((res) => {
    const car = new Car();
    car.user_id = user.id;
    car.model = 'bmw';
    car.year = '2018';
    car.save();
    return res;
});

// Удалить пользователя
userPromise.then((res) => {
    user.delete(user.id);
    return res;
});