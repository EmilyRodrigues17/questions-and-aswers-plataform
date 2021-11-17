require('dotenv').config();
const { Sequelize } = require("sequelize");
const databaseName = process.env.DATABASE;
const hostName = process.env.HOST;
const password = process.env.PASSWORD ;

const connection = new Sequelize(databaseName, 'root', password,{
    host: hostName,
    dialect: 'mysql'
});

module.exports = connection;
