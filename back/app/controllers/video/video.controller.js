const db = require('../../models');
const Video = db.video;
const SousTitre = db.sous_titre;
const Master = db.master;
const Langue = db.langue;
const Instrument = db.instrument;
const Format = db.format;




exports.getAll = async (req, res) => {
    const videos = await Video.findAll({
        include: [
            {
                model: SousTitre,
                attributes: ['name'],
                required: true
            },
            {
                model: Master,
                attributes: ['name'],
                required: true
            },
            {
                model: Langue,
                attributes: ['name'],
                required: true
            },
            {
                model: Instrument,
                attributes: ['name'],
                required: true
            },
            {
                model: Format,
                attributes: ['name'],
                required: true,
            },
        ]
    });

    res.status(200).send({ data: videos });
}

exports.getVideo = async (req, res) => {
    let videoId = req.query.id

    console.log(req.query)

    const video = await Video.findOne({
        include: [
            {
                model: SousTitre,
                attributes: ['name'],
                required: true
            },
            {
                model: Master,
                attributes: ['name'],
                required: true
            },
            {
                model: Langue,
                attributes: ['name'],
                required: true
            },
            {
                model: Instrument,
                attributes: ['name'],
                required: true
            },
            {
                model: Format,
                attributes: ['name'],
                required: true,
            },
        ],
        where: { id: videoId }
    })

    if(video === null) {
        res.status(404).send({message: 'video not found...'})
    } else {
        res.status(200).send({message: 'Video founded !', data: video})
    }
}

exports.CreateVideo = async (req, res) => {
    const video = await Video.create({
        url: req.body.url,
        title: req.body.title,
        description: req.body.description
    }).catch((err) => { res.status(500).send({ message: err.errors })})

    await SousTitre.create({ name: req.body.SousTitre, videoId: video.id }).catch((err) => { console.log(res.status(500).send({ message: err.errors })) }) 

    await video.createMaster({ name: req.body.master }).catch((err) => { console.log(res.status(500).send({ message: err.errors })) })

    await video.createLangue({ name: req.body.langue }).catch((err) => { console.log(res.status(500).send({ message: err.errors })) })

    await video.createInstrument({ name: req.body.instrument }).catch((err) => { console.log(res.status(500).send({ message: err.errors })) })

    await video.createFormat({ name: req.body.format }).catch((err) => { console.log(res.status(500).send({ message: err.errors })) })

    res.status(200).send({message: 'Video created successfully!'})
}