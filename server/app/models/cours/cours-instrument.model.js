module.exports = (sequelize, Sequelize) => {
    const CoursInstrument = sequelize.define("cours_instrument", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        }
    })

    return CoursInstrument
}