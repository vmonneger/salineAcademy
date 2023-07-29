module.exports = (sequelize, Sequelize) => {
    const CoursMaster = sequelize.define("cours_master", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        }
    })

    return CoursMaster
}