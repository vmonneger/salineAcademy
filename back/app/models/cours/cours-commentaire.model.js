module.exports = (sequelize, Sequelize) => {
    const CoursCommentaire = sequelize.define("cours_commentaire", {

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