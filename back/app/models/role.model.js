module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        permission: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Role
}