module.exports = (sequelize, Sequelize) => {
    const Tasks = sequelize.define("tasks", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        categoryId: {
            type: Sequelize.INTEGER
        }
    });

    return Tasks;
};