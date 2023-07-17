module.exports = (sequelize, Sequelize) => {
    const Licence_mail = sequelize.define("licence_mail", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            isEmail: true,  
            allowNull: false,
        }
    })

    return Licence_mail
}