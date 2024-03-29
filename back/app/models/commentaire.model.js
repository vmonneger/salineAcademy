module.exports = (sequelize, Sequelize) => {
    const Commentaires = sequelize.define("commentaire", {

        titre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        }
    })

    return Commentaires
}