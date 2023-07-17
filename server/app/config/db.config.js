module.exports = {
    HOST: "localhost",
    USER: 'root',
    PASSWORD: 'root',
    DB: 'saline_academy',
    dialect: 'postgres',
    port: 5433,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}