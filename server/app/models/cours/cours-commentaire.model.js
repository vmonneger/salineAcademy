module.exports = (sequelize, Sequelize) => {
    const CoursCommentaire = sequelize.define("cours_commentaire", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    })

    return CoursCommentaire
}