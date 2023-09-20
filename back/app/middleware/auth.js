const isLoggedIn = (req, res, next) => {
    console.log(req.session.userId)
    if (req.session === undefined || req.session.userId === undefined ) {
        return res.status(401).send({ message: 'Unauthorized!' });
    }
    next();
};

const isSameUser = (req, res, next) => {
    console.log('req prams =>', req.params)
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