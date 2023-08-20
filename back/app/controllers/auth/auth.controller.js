const db = require('../../models');
const config = require('../../config/auth.config');
const User = db.users;
const Role = db.role;
const Abonnement = db.abonnement;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {

    let roleName = req.body.name ? req.body.name : 'USER' 

    const role =  await Role.findOne({
        where : {name: roleName}
    })
    
    // Save User to Database
    const user = User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        premium: req.body.premium,
        abonnementId: null,
        roleId: role.id
    })
        

    if(user === null ) {
        res.status(500).send({ message: err.message });
    } else {
        console.log('User was registered successfully!');
        res.send({ message: 'User was registered successfully!' })
    }
};

exports.signIn = async (req, res) => {
   const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(user == null) {
        res.status(500).send({ message: 'user not found' })
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

    const userRole = await user.getRole({
        attributes: ['name']
    });

    const token = jwt.sign(
        { id: user.id, role: userRole},
        config.secret,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
        }
    );

        res.status(200).send({ message: 'signUp successfull', token: token, userData: { firstName: user.first_name, last_name: user.last_name, email: user.email, premium: user.premium }  })
};