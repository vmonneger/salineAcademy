const isLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).send({ message: 'Unauthorized!' });
    }
    next();
};

const isSameUser = (req, res, next) => {
    if (req.session.userId !== req.params.id) {
        return res.status(403).send({ message: 'Forbidden!' });
    }
    next();
};

const auth = {
    isLoggedIn,
    isSameUser,
};

module.exports = auth