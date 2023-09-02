const db = require('../../models');
const User = db.users;
const Role = db.role;
const bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {
    try {
        let roleName = req.body.name ? req.body.name : 'USER' 
        
        const role =  await Role.findOne({
            where : {name: roleName}
        })
    
        const user = await User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            premium: req.body.premium,
            abonnementId: null,
            roleId: role.id
        })

        req.session.userId = user.id;
        req.session.role = role.name;
        await req.session.save();

        return res.status(200).send({ 
            message: 'User was registered successfully!',
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                premium: user.premium,
                role: role.name
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
            message: 'Invalid Password!'
        });
    }

    const userRole = await user.getRole({
        attributes: ['name']
    });

    req.session.userId = user.id;
    req.session.role = userRole.name;
    await req.session.save();
    
    return res.status(200).send({ 
        message: 'signIn successfull',
        user: { 
            id: user.id, 
            firstName: user.first_name, 
            lastName: user.last_name, 
            email: user.email, 
            premium: user.premium ,
            role: userRole.name
        }
    })
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }

        res.clearCookie('salinehetic');
        res.status(200).send({ message: 'User was logged out successfully!', isAuthenticated: false });
    });
};

exports.checkAuth = (req, res) => {
    if (req.session.userId) {
        res.status(200).send({ isAuthenticated: true });
    } else {
        res.status(200).send({ isAuthenticated: false });
    }
};

