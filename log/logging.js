const {createLogger,format,transports} = require('winston')
const path = require('path')
class Logging {
    static get logger() { // method static
        return createLogger({
            level: 'silly' ,
            format : format.combine(
               format.label({ label : path.basename(process.mainModule.filename) }) ,  // get current file for output with logging
               format.timestamp({ format : 'YYYY-MM-DD HH:mm:ss' }) ,
               format.printf(format=> `${format.timestamp} ${format.level} [${format.label}] : ${format.message}`)
            ) ,
            transports : [
                new transports.Console // get logging to console
            ]
        }) // createLogger({})
    } // get logger()
}
module.exports = Logging
// Logging.logger.info("test logging level info")