const db = require('../../models')
const User = db.users;
const Role = db.role;
const Cours = db.cours;
const Video = db.video;

exports.createCour = async (req, res) => {
    try {
        const videos = req.body.videos;
        const titre = req.body.titre;
        const description = req.body.description;
        const teacher = req.body.userId;
        const students = req.body.students
    
        const cours = await Cours.create({ titre: titre, description: description, userId: teacher })
    
        for (let index = 0; index < videos.length; index++) {
            const videoId = videos[index];
            
            const video = await Video.findOne({ where: { id: videoId } })
    
            const sous_titre = await video.getSous_titres();
            const master = await video.getMaster();
            const instrument = await video.getInstrument();
            const compositeur = await video.getCompositeur();
            const langue = await video.getLangues();
            const format = await video.getFormat();
    
            await cours.createCours_video({ videoId: video.id });
            await cours.createCours_sousTitre({ sousTitreId: sous_titre[0].id });
            await cours.createCours_master({ masterId: master.id });
            await cours.createCours_instrument({ instrumentId: instrument.id });
            await cours.createCours_compositeur({ compositeurId: compositeur.id });
            await cours.createCours_langue({ langueId: langue[0].id });
            await cours.createCours_format({ formatId: format.id });
        }
    
        for (let index = 0; index < students.length; index++) {
            const student = students[index];
    
            cours.createCours_student({ userId: student })
        }
    
        res.status(200).send({ message: 'cours created successfully!'  })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error })
    }
}

exports.getCoursFromTeacher = async (req, res) => {
    console.log('<=================> GetCoursFromTeacher <==================>');

    try {
        const cours  = await Cours.findAll({
            where: { userId: req.query.id},
            attributes: ['id', 'titre', 'description']
        })
        
        if(cours.length === 0 ) {
            return res.status(404).send({ message: 'cours no\'t found' })
        } 
        
        let response = []
        
        for (let index = 0; index < cours.length; index++) {
            const element = cours[index];
            
            let datas = []
            
            const instruments = await db.cours_instrument.findAll({ where: { courId: element.id }})

            for (let index = 0; index < instruments.length; index++) {
                const instrument = instruments[index];

                let value = await instrument.getInstrument();

                const searchInstrunment = datas.find(data => (data === value.name))

                if(searchInstrunment === undefined)

                datas.push(value.name)
            }

            element.dataValues.instruments = datas

            response.push(element)

        }

        res.status(200).send(response)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error })
    }
}

exports.getCoursFromStudent = async (req, res) => {
    console.log('<=================> GetCoursFromStudent <==================>');

    try {
        const cours = await Cours.findAll({
            include: [
                { model: db.cours_student, where: { userId: req.query.id }, attributes: []},
                { model: db.users, attributes: [['first_name', 'teacherFirstName'], ['last_name', 'teacherLastName']]  }
            ],
            attributes: ['id', 'titre', 'description']
        })
        
        if(cours.length === 0 ) {
            res.status(404).send({ message: 'cours no\'t found' })
        }

        let response = []
        
        for (let index = 0; index < cours.length; index++) {
            const element = cours[index];
            
            let datas = []
            
            const instruments = await db.cours_instrument.findAll({ where: { courId: element.id }})

            for (let index = 0; index < instruments.length; index++) {
                const instrument = instruments[index];

                let value = await instrument.getInstrument();

                const searchInstrunment = datas.find(data => (data === value.name))

                if(searchInstrunment === undefined)

                datas.push(value.name)
            }

            element.dataValues.instruments = datas

            response.push(element)

        }


        res.status(200).send({cours: response})
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'error' })
    }
    


}

exports.getSchoolStudents = async (req, res) => {
    console.log('<=================> GetSchoolStudents <==================>');
    try {
        const user = await User.findOne({ where: { id: req.query.userId } });
        
        const schoolId = user.schoolId;
        
        const role = await Role.findOne({ where: { name: "STUDENT"} })

        const students = await User.findAll({ 
            where: { roleId: role.id, schoolId: schoolId },
            attributes: ['id', ['first_name', 'firstName'], ['last_name', 'lastName']]
        })

        res.status(200).send( { students: students })
    } catch (error) {
        res.status(500).send({ message: error})
        console.log(error)
    }
}