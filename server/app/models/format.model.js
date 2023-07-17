module.exports = (sequelize, Sequelize) => {
    const Format = sequelize.define("format", {
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

    return Format
}