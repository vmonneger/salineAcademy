const csvToJson = require('convert-csv-to-json');
const bcrypt = require('bcrypt');
const { transporter, mailData } = require('../../mailer/sendMail');

const db = require('../../models');
const Role = db.role;
const User = db.users;
const School = db.school;
const Licence = db.licence;


exports.signFromCsv = async (req, res) => {

    console.log('<============> School signUp <============>')
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

                    const characters = 'ABCD@E$F+I*UV&WXY@Z?jkl!mqrst%uvw=xy*z0123456789-';
                    let charactersLength = characters.length;
                    let randString = ''

                    for (let i = 0; i < 5; i++) {
                        randString += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }

                    const password = user.Nom + randString
    
                    const createUser = await User.create({
                        first_name: user.Prénom,
                        last_name: user.Nom,
                        email: user.Email,
                        password: bcrypt.hashSync(password, 8),
                        premium: true,
                        abonnementId: null,
                        roleId: role.id,
                        schoolId: school.dataValues.id
                    })
    
                    if (createUser){
        
                        mailData.to = user.Email
                        mailData.html = `<b>Bienvenue dans la Saline Royal Academy ${user.Prénom} </b> <br></br> <br> Veuillez cliquer sur ce lien pour finaliser la création de votre compte: https://salinehetic.tech <br/> Votre mot de passe est: ${password}`
                        
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
            
        return res.status(200).send({message: 'school info created successfully!'})
    
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error })
    }

}