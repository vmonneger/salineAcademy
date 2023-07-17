module.exports = (sequelize, Sequelize) => {
    const School = sequelize.define("school", {
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

    return School
}