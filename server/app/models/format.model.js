module.exports = (sequelize, Sequelize) => {
    const Format = sequelize.define("format", {

        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Format
}