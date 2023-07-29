const db = require('../../models');
const config = require('../../config/auth.config');
const User = db.users;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {

    let role;

    if(req.body.role === undefined) {
        role = await Role.findOne({
            where: { name: 'USER'}
        })
    } else {
        role = req.body.role;
    }

    // Save User to Database
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        premium: false,
        roleId: role.id,
        abonnementId: null,
    })
    .then(() => {
        console.log('User was registered successfully!');
        res.send({ message: 'User was registered successfully!' })
    }) .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.signIn = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        var passwordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid Password!'
            });
        }

        const token = jwt.sign(
            { id: user.id },
            config.secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            }
        );
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};