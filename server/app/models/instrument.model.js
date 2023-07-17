module.exports = (sequelize, Sequelize) => {
    const Instrument = sequelize.define("instrument", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Instrument
}