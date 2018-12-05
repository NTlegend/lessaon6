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
console.log(User.load(1));
console.log(User.loadAll());

// Создать нового пользователя
const user = new User();
user.first_name = 'Alexey';
user.last_name = 'Bobrov';
user.age = '42';
user.gender = 'M';

// Изменить имя пользователю
const user_id = user.save();
user.first_name = 'Dmitriy';
user.save(user_id);

// Добавить пользователю новую машину
const car = new Car();
car.user_id = user_id;
car.model = 'volga';
car.year = '1998';
const car_id = car.save();

// Удалить пользователя


// Закрываем соединение с базой
global.db.end();

/*

Нужно реадизовать паттерн ActiveRecord, а именно в файле model.js нужно написать методы:
load - получение экземпляра одной строки с БД по первичному ключу
loadAll - получение массива экземпляров класса
save - сохранение в БД (если PK не задан - то создание, иначе - обновление)
delete - удаление с БД

эти методы должны быть универсальны, чтобы один и тот же код корректно работал для обоих моделей  User и Car.

Полученый код нужно зхакомитить и запушить в git репозиторий и присылайте мне ссылочку. желательно коммиты делать поэтапно.

*/