let csvToJson = require('convert-csv-to-json');
const jwt = require('jsonwebtoken');

const config = require('../../config/auth.config')
const { transporter, mailData } = require('../../mailer/sendMail');

const db = require('../../models');
const Role = db.role;
const User = db.users;
const School = db.school;
const Licence = db.licence;


exports.signFromCsv = async (req, res) => {
    try {
        const limitDate = new Date();
        limitDate.setFullYear(limitDate.getFullYear() + 1);
        
        const licence = await Licence.create({ limit_date: limitDate})
        
        if (licence){
            
            const school = await School.create({
                name: req.body.schoolName,
                licenceId: licence.id
            })

            if (school) {

                let json = csvToJson.getJsonFromCsv(req.file.path)
                
                json.map( async (user) =>  {
                    const role = await Role.findOne({ where: {name: user.Role}})
    
                    const createUser = await User.create({
                        first_name: user.Prénom,
                        last_name: user.Nom,
                        email: user.Email,
                        password: null,
                        premium: true,
                        abonnementId: null,
                        roleId: role.id,
                        schoolId: school.dataValues.id
                    })
    
                    if (createUser){
                        const token = jwt.sign(
                            { id: createUser.id},
                            config.secret,
                            {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                            }
                        );
        
                        mailData.to = user.Email
                        mailData.html = `<b>Bienvenue dans la Saline Royal Academy ${user.Prénom} </b> <br></br> <br> Veuillez cliquer sur ce lien pour finaliser la création de votre compte: https://salinehetic.tech/reset-password/${token} <br/>`
                        
                        transporter.sendMail(mailData, function(error, info){
                            if (error) {
                        console.log(error);
                            } else {
                            console.log('Email sent: ' + info.response);
                            }
                        });
                    }
                })
            } else {
                res.status(500).send({ message: error })
            }
            
        }    
            
        return res.status(200).send({message: {mailData: mailData, transporter: transporter.options}})
    
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error })
    }

}