module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            isEmail: true,  
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        premium: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    })

    return User
}