const Sequelize = require('sequelize');
const Member = require('./Member');
const Todo = require('./Todo');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize; // 연결객체 연결
db.Sequelize = Sequelize;

db.Member = Member;
db.Todo = Todo;

Member.init(sequelize);
Todo.init(sequelize);

Member.associate(db);
Todo.associate(db);

module.exports = db;