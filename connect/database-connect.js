const log = require('../log/logging').logger
const path = require('../services/modules-app-service').path
const mysql2 = require('../services/modules-app-service').mysql2
const dotenv = require('dotenv')

dotenv.config({path:path.join(__filename,'../../env/.env')}) // connect env file
class DatabaseConnect {
    static get pooling () {
       return  mysql2.createPool({
            connectionLimit : 1 ,
            host : process.env.MYSQL_HOST ,
            user : process.env.MYSQL_USERNAME ,
            password : process.env.MYSQL_PASSWORD ,
            database : process.env.MYSQL_DATABASE ,
            port : process.env.MYSQL_PORT
        })
    }
}
module.exports = DatabaseConnect.pooling
DatabaseConnect.pooling.getConnection((err, connection) => {
    if (err) {
        log.debug("connect failed from pooling() function")
        throw err
    }
    else log.info("connected")
})



