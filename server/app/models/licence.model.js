module.exports = (sequelize, Sequelize) => {
    const Licence = sequelize.define("licence", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        limit_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    })

    return Licence
}