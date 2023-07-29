const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - aplication/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const db = require("./app/models");

db.sequelize.sync()
.then(() => {
    console.log('Synced db.');
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message)
});
    
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
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

