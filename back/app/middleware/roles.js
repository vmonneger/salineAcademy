const checkRole = (roleAcces) => {

    return (req, res, next) => {
        try {

            let check = roleAcces.find(role => role === req.session.role);

            if(check === undefined) {
                return res.status(401).send({ message: 'Unauthorized' });
            
            } else {
                next();
            }
        }
        catch (err) {
            res.status(400).send("Invalid session");
        }
    }

};

const role = {
    checkRole
}

module.exports = role
