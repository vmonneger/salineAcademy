module.exports = (sequelize, Sequelize) => {
    const Instrument = sequelize.define("instrument", {

        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Instrument
}