module.exports = (sequelize, Sequelize) => {
    const Langue = sequelize.define("langue", {
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

    return Langue
}