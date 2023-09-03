const bcrypt = require('bcrypt');

const db = require('../../models');
const User = db.users;

const attributesToExclude = ['password', 'createdAt', 'updatedAt'];

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: attributesToExclude }
        })
        return res.status(200).send({ users });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId, {
            attributes: { exclude: attributesToExclude }
        });

        if (!user) {
            return res.status(404).send({ message: 'User not found!' });
        }

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const password = bcrypt.hashSync(req.body.password, 8)
    
    try {
        const user = await User.update({ password: password }, {
            where: { id: req.body.userId }
        });
        
        res.status(200).send({ message: 'Password changed successfully !' })
    } catch (error) {
        return res.status(500).send({ message: error });
    }

}