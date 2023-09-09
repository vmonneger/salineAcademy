const db = require('../../models')
const User = db.users;
const Role = db.role;
const Cours = db.cours;
const Video = db.video;

exports.createCour = async (req, res) => {
    try {

        if (!(req.body.videos instanceof Array)) {
            return res.status(500).send({message: 'please check data types'});
        }
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
            return res.status(404).send({ message: 'cours not found' })
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

                if(searchInstrument === undefined)

                datas.push(vlue.name)
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

                const searchInstrument = datas.find(data => (data === value.name))

                if(searchInstrument === undefined)

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

exports.updateCours = async (req, res) => {
    console.log('<=================> UpdateCours <==================>');

    try {

        const cours = await Cours.findOne({
            where: {id: req.body.coursId},
            include: { all: true, nested: true, attributes: ['id']}
        })

 
        if (cours === null) {
            return res.status(404).send({ message: 'cours not found' })
        }

        if(req.body.videos) {

            const newVideos = req.body.videos
            
    
            const previousVideos = await cours.getCours_videos({include: {model: db.video, nested: true}})

            
            const videosToDelete = previousVideos.filter((data) => newVideos.find((element) => element === data.videoId) === undefined)
            
            if (videosToDelete.length > 0) {
                console.log("removing videos...")

                for (let index = 0; index < videosToDelete.length; index++) {
                    const video = videosToDelete[index].video;
    
                    const instrument = await video.getInstrument({ attributes: ['id'] });
                    const sous_titre = await video.getSous_titres({ attributes: ['id'] });
                    const master = await video.getMaster({ attributes: ['id'] });
                    const compositeur = await video.getCompositeur({ attributes: ['id'] });
                    const langue = await video.getLangues({ attributes: ['id'] });
                    const format = await video.getFormat({ attributes: ['id'] });
    
                    
                    
                    await db.cours_instrument.destroy({where: {coursId: cours.id, instrumentId: instrument.id}});
                    await db.cours_sousTitre.destroy({where: {courId: cours.id, sousTitreId: sous_titre[0].id}});
                    await db.cours_master.destroy({where: {courId: cours.id, masterId: master.id}});
                    await db.cours_compositeur.destroy({where: {courId: cours.id, compositeurId: compositeur.id}});
                    await db.cours_langue.destroy({where: {courId: cours.id, langueId: langue[0].id}});
                    await db.cours_format.destroy({where: {courId: cours.id, formatId: format.id}});
    
                    await db.cours_video.destroy({where: {courId: cours.id, videoId: video.id}})
                }
                
                console.log('videos removed successfully !')
            }
    
            const videosToAdd = newVideos.filter((data) => previousVideos.find((element) => element.videoId === data) === undefined)

            if(videosToAdd.length > 0) {
                console.log("adding videos...")

                for (let index = 0; index < videosToAdd.length; index++) {
                    const id = videosToAdd[index];

                    const video = await Video.findOne({ where: {id: id} })

                    if(video === null) {
                        return res.status(404).send({ message: 'video not found' })
                    }
                    
                    const instrument = await video.getInstrument({ attributes: ['id'] });
                    const sous_titre = await video.getSous_titres({ attributes: ['id'] });
                    const master = await video.getMaster({ attributes: ['id'] });
                    const compositeur = await video.getCompositeur({ attributes: ['id'] });
                    const langue = await video.getLangues({ attributes: ['id'] });
                    const format = await video.getFormat({ attributes: ['id'] });

                    await cours.createCours_video({ videoId: video.id });
                    await cours.createCours_sousTitre({ sousTitreId: sous_titre[0].id });
                    await cours.createCours_master({ masterId: master.id });
                    await cours.createCours_instrument({ instrumentId: instrument.id });
                    await cours.createCours_compositeur({ compositeurId: compositeur.id });
                    await cours.createCours_langue({ langueId: langue[0].id });
                    await cours.createCours_format({ formatId: format.id });
                }

                console.log('videos added successfully !')
            }
        }

        if(req.body.students) {

            const previousStudents = await cours.getCours_students();

            const studentsToRemove = previousStudents.filter((student) => req.body.students.find((element) => student.userId === element) === undefined)

            if(studentsToRemove.length > 0) {
                console.log("remove students...")

                for (let index = 0; index < studentsToRemove.length; index++) {

                    const student = studentsToRemove[index].userId;

                    db.cours_student.destroy({ where: {courId: cours.id, userId: student} })
                }

                console.log('students removed successfully')
            }

            const studentsToAdd = req.body.students.filter((element) => previousStudents.find((student) => element === student.userId ) === undefined)

            if(studentsToAdd.length > 0) {
                console.log('adding students...')

                for (let index = 0; index < studentsToAdd.length; index++) {

                    const student = studentsToAdd[index];

                    const verifyStudent = await User.findByPk(student)

                    if(verifyStudent === null) {
                        return res.status(404).send({ message: 'user not found' })
                    }

                    await cours.createCours_student({ userId: student })
                }

                console.log('students added successfully')
            }

        }
        
        if(req.body.description) {
            await Cours.update({ description: req.body.description }, { where: {id: req.body.coursId} })

            console.log('description updated')
        }

        if(req.body.titre) {
            await Cours.update({ titre: req.body.titre }, { where: {id: req.body.coursId} })

            console.log('titre updated')
        }

        res.status(200).send({message: 'Cours updated successfully'})

    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }    
}

exports.deleteCours = async (req, res) => {
    try {
        console.log(req.body)

        const cours = await Cours.findByPk(req.body.coursId)

        if(cours === null) {
            return res.status(404).send({ message: 'cours not found' })
        }

        await cours.destroy({ where: {id: req.body.coursId} })

        res.status(200).send({message: 'cours deleted successfully'})
    } catch (error) {
        console.log(error);

        res.status(500).send({error})
    }
}