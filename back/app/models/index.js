const dbConfig = require("../config/db.config")

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* --- User & UserInfo tables ---*/
db.users = require('./user.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);

/* --- Administration tables --- */
db.school = require('./school.model')(sequelize, Sequelize);
db.licence = require('./licence.model')(sequelize, Sequelize);
db.licence_mail = require('./licence_mail.model')(sequelize, Sequelize);
db.abonnement = require('./abonnement.model')(sequelize, Sequelize);
db.professeur = require('./professeur.model')(sequelize, Sequelize);

/* --- Video tables ---*/
db.video = require('./video.model')(sequelize, Sequelize);
db.format = require('./format.model')(sequelize, Sequelize);
db.langue = require('./langue.model')(sequelize, Sequelize);
db.compositeur = require('./compositeur.model')(sequelize, Sequelize);
db.master = require('./master.model')(sequelize, Sequelize);
db.instrument = require('./instrument.model')(sequelize, Sequelize);
db.sous_titre = require('./sous-titres.model')(sequelize, Sequelize);
db.commentaires = require('./commentaire.model')(sequelize, Sequelize);

/*--- Cours tables ---*/
db.cours = require('./cours/cours.model')(sequelize, Sequelize);
db.cours_commentaire = require('./cours/cours-commentaire.model')(sequelize, Sequelize);
db.cours_compositeur = require('./cours/cours-compositeur.model')(sequelize, Sequelize);
db.cours_format = require('./cours/cours-format.model')(sequelize, Sequelize);
db.cours_instrument = require('./cours/cours-instrument.model')(sequelize, Sequelize);
db.cours_langue = require('./cours/cours-langue.model')(sequelize, Sequelize);
db.cours_master = require('./cours/cours-master.model')(sequelize, Sequelize);
db.cours_sousTitre = require('./cours/cours-sousTitre.model')(sequelize, Sequelize);
db.cours_student = require('./cours/cours-student.model')(sequelize, Sequelize);
db.cours_video = require('./cours/cours-video.model')(sequelize, Sequelize);


// User's relations
db.abonnement.hasMany(db.users, {as: "users", allowNull: true})
db.role.hasMany(db.users, {as: "users"})

db.users.belongsTo(db.abonnement);
db.users.belongsTo(db.role);
db.users.belongsTo(db.school);

// Licence_mail's relations
db.licence_mail.belongsTo(db.licence)

// School's relations
db.licence.hasOne(db.school)
db.school.belongsTo(db.licence)
db.school.hasMany(db.users)

// Video's relations
db.video.hasMany(db.langue)
db.video.hasOne(db.master)
db.video.hasMany(db.sous_titre)
db.video.hasOne(db.instrument)
db.video.hasOne(db.compositeur)
db.video.hasMany(db.commentaires)
db.video.hasOne(db.format)

// Sous-titre's relations
db.sous_titre.belongsTo(db.video)

// Langue's relations
db.langue.belongsTo(db.video)

// Master's relations
db.master.belongsTo(db.video) 

// Instrument's relations
db.instrument.belongsTo(db.video)

// Compositeur's relation
db.compositeur.belongsTo(db.video)

// Commentaire's relations
db.commentaires.belongsTo(db.video)

// Cours's relations
db.cours.hasOne(db.professeur, { onDelete: 'CASCADE' })
db.cours.hasMany(db.cours_commentaire, { onDelete: 'CASCADE' })
db.cours.hasMany(db.cours_compositeur, { onDelete: 'CASCADE' })
db.cours.hasMany(db.cours_format, { onDelete: 'CASCADE' })
db.cours.hasMany(db.cours_instrument, { onDelete: 'CASCADE' })
db.cours.hasMany(db.cours_langue, { onDelete: 'CASCADE' })
db.cours.hasMany(db.cours_master, { onDelete: 'CASCADE' })
db.cours.hasMany(db.cours_sousTitre, { onDelete: 'CASCADE' })
db.cours.hasMany(db.cours_student, { onDelete: 'CASCADE' })
db.cours.hasMany(db.cours_video, { onDelete: 'CASCADE' })
db.cours.belongsTo(db.users)

db.cours_commentaire.belongsTo(db.users)
db.cours_compositeur.belongsTo(db.compositeur)
db.cours_format.belongsTo(db.format)
db.cours_instrument.belongsTo(db.instrument)
db.cours_langue.belongsTo(db.langue)
db.cours_master.belongsTo(db.master)
db.cours_sousTitre.belongsTo(db.sous_titre)
db.cours_student.belongsTo(db.users)
db.cours_video.belongsTo(db.video)




module.exports = db;