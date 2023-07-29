module.exports = (sequelize, Sequelize) => {
    const Licence_mail = sequelize.define("licence_mail", {

        email: {
            type: Sequelize.STRING,
            isEmail: true,  
            allowNull: false,
        }
    })

    return Licence_mail
}