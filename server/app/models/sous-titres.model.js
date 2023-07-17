module.exports = (sequelize, Sequelize) => {
    const SousTitre = sequelize.define("sous-titre", {
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

    return SousTitre
}