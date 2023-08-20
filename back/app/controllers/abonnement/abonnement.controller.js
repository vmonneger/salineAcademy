const db = require('../../models');
const Abonnement = db.abonnement;
const User = db.users;

exports.subscribe = async (req, res) => {

    // const date = req.body.date;
    const date = new Date();
    let limit_date = new Date(date.setFullYear(date.getFullYear() + 1))

    
    const userId = req.body.userId;

    const abonnement = await Abonnement.create({
        name: req.body.name,
        limite_date: limit_date,
        monthly: req.body.monthly
    })

    const user = await User.findOne({
        where: {id: userId}
    })

    // console.log(user)

    if (user){
        user.update({ abonnementId:  abonnement.id})
    }


    res.status(200).send({ message: 'Subcription done successfully !' })
}