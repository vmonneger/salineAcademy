module.exports = (sequelize, Sequelize) => {
    const School = sequelize.define("school", {

        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return School
}