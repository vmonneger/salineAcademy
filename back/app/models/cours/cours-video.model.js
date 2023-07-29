module.exports = (sequelize, Sequelize) => {
    const CoursVideo = sequelize.define("cours_video", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        }
    })

    return CoursVideo
}