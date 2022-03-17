var Sequelize = require('sequelize');

exports.sequelize = new Sequelize('logindb', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
});