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
        
        const findSchool = await School.findOne({
            where: { name: req.body.schoolName }
        })

        let school = {}

        if (findSchool === null) {
            console.log('<============> Create school licence <============>')
            const licence = await Licence.create({ limit_date: limitDate })

            school = await licence.createSchool({ name: req.body.schoolName })

            console.log('school created ==============>', school)
        } else {
            console.log('school founded ==============>', findSchool)
            school.id = findSchool.id
        }

        const data = await School.findOne({
            where: { id: school.id },
            attributes: ['id', 'name'],
            include: { model: Licence, attributes: ['id', 'limit_date']}
        })

        let json = csvToJson.getJsonFromCsv(req.file.path)
        
        json.map( async (user) =>  {
            const role = await Role.findOne({ where: {name: user.Role}})

            const characters = 'AB"§àç-CD@E$F+I*UV&W%./+XY@Z?jkl!mqrst%uvw=xy*z0123456789-';
            let charactersLength = characters.length;
            let randString = ''

            for (let i = 0; i < 8; i++) {
                randString += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            const password = randString

            const [userFounded, createUser] = await User.findOrCreate({
                where: { email: user.Email },
                defaults: {
                    first_name: user.Prénom,
                    last_name: user.Nom,
                    email: user.Email,
                    password: bcrypt.hashSync(password, 8),
                    premium: true,
                    abonnementId: null,
                    roleId: role.id,
                    schoolId: school.id
                }
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
            
        return res.status(200).send({message: 'school info created successfully!', school: data})
    
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'server error' })
    }
}

exports.getLicences = async (req, res) => {
    try {
        const licences = await Licence.findAll({
            attributes: ['id', 'limit_date'],
            include: { model: School, attributes: ['id', 'name'] }
        })
    
        res.status(200).send({licences: licences})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'server error' })
    }
}

exports.getlicence = async (req, res) => {
    try {
        const licence = await Licence.findByPk(req.body.id, {
            attributes: ['id', 'limit_date'],
            include: {model: School, attributes: ['id', 'name']}
        })

        if(licence === null) {
            return res.status(400).send({ message: 'licence not found' })
        }

        res.status(200).send({licence: licence })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'server error' })
    }
}

exports.updateLicence = async (req, res) => {
    console.log('<================> upddateLicence <================>')
    try {
        const newDate = new Date();
        newDate.setFullYear(newDate.getFullYear() + 1);

        const previousLicence = await Licence.findByPk(req.body.id, {
            attributes: ['id', 'limit_date'],
            include: {model: School, attributes: ['id', 'name']}
        })

        if(previousLicence === null) {
            return res.status(400).send({ message: 'licence not found' })
        }

        previousLicence.update({ limit_date: newDate })

        previousLicence.save()

        res.status(200).send({ message: 'licence updated', licence: previousLicence })
        
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: 'sever error' })
    }
}