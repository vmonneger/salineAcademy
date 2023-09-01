const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

var corsOptions = {
    origin: "http://localhost:9000"
};

app.use(cors(corsOptions));

// parse requests of content-type - aplication/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const db = require("./app/models");

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
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

