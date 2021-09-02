module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        email: { type: Sequelize.STRING, required: true, unique: true, primaryKey: true },
        password: { type: Sequelize.STRING },
        strategy: { type: Sequelize.STRING }
    });

    return User;
};