const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const Movie = sequelize.define('Movie', {
  name: DataTypes.STRING,
  year_of_release: DataTypes.INTEGER,
  ratings: DataTypes.FLOAT,
  genres: DataTypes.STRING,
  technicians: DataTypes.STRING
}, {
  timestamps: false,
}
);

module.exports = Movie;
