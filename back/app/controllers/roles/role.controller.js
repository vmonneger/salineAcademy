const db = require('../../models')
const Role = db.role;
const Op = db.Sequelize.Op

exports.findAllRole = (req, res) => {

};

exports.findOneRole = async (req, res) => {
    const result = await Role.findOne({
        where: { name: req.body.name }
    })

    if(result !== null) {
        res.status(200).send({ data: result });
    } else {
        res.status(500).send({ data: null });
    }
}

exports.updateRole = (req, res) => {

};

exports.deleteRole = (req, res) => {

};