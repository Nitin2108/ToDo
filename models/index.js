const { Sequelize } = require('sequelize');
const db = {};
(async function connectWithDb() {
    const sequelize = new Sequelize('testdb', process.env.dbuser, process.env.dbpasswd, {
        host: 'localhost',
        dialect: 'postgres'
    });
    //connect with test db with username test and password test
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.categories = require("../models/categories.model.js")(sequelize, Sequelize);
    db.tasks = require("../models/tasks.model.js")(sequelize, Sequelize);
    db.users = require("../models/user.model.js")(sequelize, Sequelize);
    db.categories.belongsTo(db.users, {
        foreignKey: "user",
        as: "users",
    });  //foreign key relation between categories and users
    db.categories.hasMany(db.tasks, { as: "tasks" });
    //foreign key relation between task and category
    db.tasks.belongsTo(db.categories, {
        foreignKey: "categoryId",
        as: "category",
    });
    try {
        await sequelize.authenticate(); //connect with db
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
module.exports = db;