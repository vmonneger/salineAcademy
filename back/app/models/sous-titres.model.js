module.exports = (sequelize, Sequelize) => {
    const SousTitre = sequelize.define("sous-titre", {

        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return SousTitre
}