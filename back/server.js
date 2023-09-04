const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const db = require("./app/models");
const session = require('express-session');
const { createClient } = require('redis');
const RedisStore = require('connect-redis').default;

const dbInit = require('./app/config/initDb')

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

const initRoles = () => {

    console.log('<=======================> initRoles <=======================>')
    const roles = dbInit.roles;
    
    const rolePromise = roles.map(role => db.role.findOrCreate({ where: role }));

    return Promise.all(rolePromise)
}

const initVideos = async () => {
    console.log('<=======================> initVideos <=======================>')

    const videos = dbInit.videos;

    for (let index = 0; index < videos.length; index++) {
        const data = videos[index];
        
        const [video, videoCreated] = await db.video.findOrCreate({ 
            where: { url: data.url, title: data.title, description: data.description },
            defaults: { url: data.url, title: data.title, description: data.description }
        })
        
        if(videoCreated)

        await db.sous_titre.Create({ name: data.sousTitre,  videoId: video.id })

        await video.createMaster({ name: data.master })
        
        await video.createLangue({ name: data.langue })
        
        await video.createInstrument({ name: data.instrument })
        
        await video.createFormat({ name: data.format })
    }

    return('done')
}

const initUsers = async () => {
    console.log('<=======================> initUsers <=======================>')

    const users = dbInit.users;

    for (let index = 0; index < users.length; index++) {

        const user = users[index];
        const role = await db.role.findOne({ where: {name: user.roleName} })

        if(!role) {
            return
        }

        user.userData.roleId = role.id
        let userInfo = user.userData

        const [userFound, UserCreated] = await db.users.findOrCreate({ 
            where: {email: user.userData.email},
            defaults: { userInfo }
        })
    }
}

const retrySync = () => {
    db.sequelize.sync()
        .then(() => {
            initRoles()
                .then (() => {
                    initVideos();
                    initUsers()
                })
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

// School routes
require('./app/routes/school.routes')(app);

// set port, listen for requests
const PORT = process.env.API_PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

