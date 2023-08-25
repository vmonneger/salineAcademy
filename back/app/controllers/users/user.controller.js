const db = require('../../models');
const User = db.users;

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        })
        return res.status(200).send({ users});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });

        if (!user) {
            return res.status(404).send({ message: 'User not found!' });
        }

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};