module.exports = (sequelize, Sequelize) => {
    const SousTitre = sequelize.define("sous_titre", {

        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return SousTitre
}