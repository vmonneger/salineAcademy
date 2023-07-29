module.exports = (sequelize, Sequelize) => {
    const Licence = sequelize.define("licence", {

        limit_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    })

    return Licence
}