module.exports = (sequelize, Sequelize) => {
    const Commentaires = sequelize.define("commentaire", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
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