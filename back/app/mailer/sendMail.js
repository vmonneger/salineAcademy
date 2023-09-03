const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
       auth: {
            user: 'salineroyalacademy@gmail.com',
            pass: 'piqz ohyd liuf joyu',
         },
    secure: true,
});

const mailData = {
    from: 'salineroyalacademy@gmail.com',  // sender address
    to: null,   // list of receivers
    subject: 'Création de votre compte utilisateur',
    text: 'That was easy!',
    html: null
};


module.exports = { transporter, mailData }