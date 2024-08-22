
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require("dotenv").config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  pool: { max: 20, min: 0, idle: 10000 },
  dialectOptions: {
    ssl: {
      require: true, // This will enable SSL connection
      rejectUnauthorized: false // This will bypass any SSL validation issues
    }
  },
  logging: false
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.genset = require('../src/genset/genset_models')(sequelize,DataTypes);
db.engine = require('../src/engine/engine_models')(sequelize,DataTypes);
db.mains = require('../src/mains/mains_models')(sequelize,DataTypes);
db.alternator = require('../src/alternator/alternator_models')(sequelize,DataTypes);
db.alerts = require('../src/alerts/alerts_models')(sequelize,DataTypes);
db.system = require('../src/system_details/system_details_models')(sequelize,DataTypes);
db.contact = require('../src/contact_details/contact_details_models')(sequelize,DataTypes);


db.sequelize.sync({force: false})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

module.exports = db;
