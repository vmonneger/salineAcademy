module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define("video", {
        url: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                is: '^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$'
            },
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Video
}