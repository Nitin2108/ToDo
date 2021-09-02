module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("categories", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.STRING
        },
        user:{
            type:Sequelize.STRING
        }
    });

    return Categories;
};