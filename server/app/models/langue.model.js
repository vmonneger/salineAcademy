module.exports = (sequelize, Sequelize) => {
    const Langue = sequelize.define("langue", {

        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Langue
}