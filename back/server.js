const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const db = require("./app/models");
const session = require('express-session');
const { createClient } = require('redis');
const RedisStore = require('connect-redis').default;

const app = express();

app.use(cors({
    origin: "https://salinehetic.tech",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const redisClient = createClient({
    socket: {
        host: 'redis',
        port: process.env.REDIS_PORT
    }
});
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
    client: redisClient,
    prefix: "salinehetic:",
});

const sess = {
    name: 'salinehetic',
    store: redisStore,
    secret: process.env.AUTH_CONFIG,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 ,
        secure: false
    },
}

if (process.env.NODE_ENV !== 'DEV') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

app.use(session(sess));

const retrySync = () => {
    db.sequelize.sync()
        .then(() => {
        console.log('Synced db.');
        const roles = [
            { name: 'USER', permission: 'USER' },
            { name: 'TEACHER', permission: 'TEACHER' },
            { name: 'STUDENT', permission: 'STUDENT' },
            { name: 'ADMIN', permission: 'ADMIN' },
        ];
        const promises = roles.map(role => db.role.findOrCreate({ where: role }));
        return Promise.all(promises);
        })
        .catch((err) => {
        console.log("Failed to sync db: " + err.message);
        console.log('Retrying in 5 seconds...');
        setTimeout(retrySync, 5000);
        });
};
  
retrySync();
    
// simple route

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Saline Academy API." });
});

// Auth routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Role routes
require('./app/routes/role.routes')(app); 

// set port, listen for requests
const PORT = process.env.API_PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

