const db = require('../../models');
const User = db.users;
const Role = db.role 

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

exports.getCurrentUser = async (req, res) => {

    const userId = req.session.userId

    try {
        const user = await User.findByPk(userId, {
            attributes: ['id', ['first_name', 'firstName'], ['last_name', 'lastName'], 'email', 'premium'],
            include: {
                model: Role,
                attributes: ['name']
              }
        })

        return res.status(200).send({user: user});

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message });
    }
}