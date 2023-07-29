module.exports = (sequelize, Sequelize) => {
    const CoursSousTritre = sequelize.define("cours_sousTitre", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        }
    })

    return CoursSousTritre
}