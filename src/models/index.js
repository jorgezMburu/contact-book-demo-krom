'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require('../db_config/config.json')[env];
var db        = {};
var opts = {
  define: {
  //prevent sequelize from pluralizing table names
  freezeTableName: true,
	operatorsAliases: Sequelize.Op
  },
  dialect: 'mysql',
  dialectOptions: {
      useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: function (field, next) { // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
          return next()
        },
  },
  timezone: '+00:00',
  pool: { 
    max: 10000,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable],opts);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config,opts);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

