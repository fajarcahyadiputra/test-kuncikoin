require('dotenv').config();
const {
    NAMEUSER,
    DBNAME,
    DIALECT,
    PASSWORD,
    HOSTNAME,
} = process.env;

module.exports = {
    "development": {
        "username": NAMEUSER,
        "password": PASSWORD,
        "database": DBNAME,
        "host": HOSTNAME,
        "dialect": DIALECT,
        timezone: '+07:00',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
        // timezone: '+05:30', // for writing to database
    },
    "production": {
        "username": NAMEUSER,
        "password": PASSWORD,
        "database": DBNAME,
        "host": HOSTNAME,
        "dialect": DIALECT,
        timezone: '+07:00',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
}

