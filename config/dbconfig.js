const {Sequelize} = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
    host: process.env.SQL_SERVER,
    dialect: 'mysql',
    timezone:'+00:00',
    waitForConnection:true,
    connectionLimit:10,
    queueLimit:0
  });
  const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

module.exports = { sequelize, Sequelize, connectDB };
