const db = require('../models');
const User = db.users;

const checkDuplicateEmail = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (existingUser) {
            return res.status(400).send({
                message: "Failed! Email is already in use!"
            });
        }

        next();
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while checking the email."
        });
    }
}

module.exports = {
    checkDuplicateEmail
};
