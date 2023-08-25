const db = require('../../models');
const config = require('../../config/auth.config');
const User = db.users;
const Role = db.role;
const Abonnement = db.abonnement;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {
    try {
        let roleName = req.body.name ? req.body.name : 'USER' 
        
        const role =  await Role.findOne({
            where : {name: roleName}
        })
    
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            premium: req.body.premium,
            abonnementId: null,
            roleId: role.id
        })

        return res.status(200).send({ 
            message: 'User was registered successfully!',
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                premium: user.premium,
                role: role.id
            }
        })
    } catch (error) {   
        return res.status(500).send({ message: error.message });
    }
};

exports.signIn = async (req, res) => {
   const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(user == null) {
        return res.status(500).send({ message: 'user not found' })
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
        { id: user.id, role: userRole.name },
        config.secret,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
        }
    );

        return res.status(200).send({ 
            message: 'signUp successfull',
            token: token,
            userData: { 
                id: user.id, 
                firstName: user.first_name, 
                last_name: user.last_name, 
                email: user.email, 
                premium: user.premium ,
                role: userRole.name
            }  
        })
};