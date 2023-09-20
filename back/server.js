const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const db = require("./app/models");
const session = require('express-session');
const { createClient } = require('redis');
const RedisStore = require('connect-redis').default;

const dbInit = require('./app/config/initDb')

const app = express();

app.use(morgan('short'));

app.use(cors({
    origin: ["https://salinehetic.tech", 'http://localhost:9000'],
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

const initRoles = async () => {
    
    try {
        const roles = dbInit.roles;
        
        for (let index = 0; index < roles.length; index++) {
            const data = roles[index];
            
            const [roleFounded, roleCreated] = await db.role.findOrCreate({
                where: {name: data.name} ,
                defaults: { name: data.name}
            })
        }

        return(true)
    } catch (error) {
        console.log(error)
    }
}

const initVideos = async () => {
    const videos = dbInit.videos;

    try {
        for (let index = 0; index < videos.length; index++) {
            const data = videos[index];
            
            const [video, videoCreated] = await db.video.findOrCreate({ 
                where: { url: data.url, title: data.title, description: data.description },
                defaults: { url: data.url, title: data.title, description: data.description }
            })
            
            if(videoCreated) {
    
                await video.createSous_titre({name: data.sousTitre})
        
                await video.createMaster({ name: data.master })

                await video.createCompositeur({ name: data.compositeur })
                
                await video.createLangue({ name: data.langue })
                
                await video.createInstrument({ name: data.instrument })
                
                await video.createFormat({ name: data.format })
            }

        }

        return(true)

    } catch (error) {
        console.log(error)
    }
}

const initUsers = async () => {

    const users = dbInit.users;

    try {
        for (let index = 0; index < users.length; index++) {
    
            const user = users[index];
            const role = await db.role.findOne({ where: {name: user.roleName} })
    
            if(!role) {
                return (false)
            }
    
            const userInfo = user.userData
    
            const [userFound, UserCreated] = await db.users.findOrCreate({ 
                where: {email: user.userData.email},
                defaults: { first_name: userInfo.first_name, last_name: userInfo.last_name, email: userInfo.email, password: userInfo.password, premium: userInfo.premium, roleId: role.id, abonnementId: userInfo.abonnementId, schoolId: userInfo.schoolId}
            })
        }

        return(true)
        
    } catch (error) {
        console.log(error)
        // return(error)
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

//Video routes
require('./app/routes/video.routes')(app);

// School routes
require('./app/routes/school.routes')(app);

//Cours routes
require('./app/routes/cours.routes')(app);

// set port, listen for requests
const PORT = process.env.API_PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

