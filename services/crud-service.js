const pooling = require('../connect/database-connect')
const log = require('../log/logging').logger
const directSql = require('./direct-sql-service')

class CrudService {
    formatDatetimeSql = () => {
        const dateObj = new Date();
        let year = dateObj.getFullYear();
        let month = dateObj.getMonth();
        month = ('0' + (month + 1)).slice(-2);
        // To make sure the month always has 2-character-format. For example, 1 => 01, 2 => 02
        let date = dateObj.getDate();
        date = ('0' + date).slice(-2);
        // To make sure the date always has 2-character-format
        let hour = dateObj.getHours();
        hour = ('0' + hour).slice(-2);
        // To make sure the hour always has 2-character-format
        let minute = dateObj.getMinutes();
        minute = ('0' + minute).slice(-2);
        // To make sure the minute always has 2-character-format
        let second = dateObj.getSeconds();
        second = ('0' + second).slice(-2);
        // To make sure the second always has 2-character-format
        return `${year}/${month}/${date} ${hour}:${minute}:${second}`
    }

    create = (productName, productPrice, productStatus, productBuild) => {
        return new Promise((resolve, reject) => {
            pooling.query(directSql.create, [productName, productStatus, productPrice, productBuild], (error, info) => {
                /*
                info
                ResultSetHeader {
                          fieldCount: 0,
                          affectedRows: 1,
                          insertId: 0,
                          info: 'Rows matched: 1  Changed: 1  Warnings: 0',
                          serverStatus: 2,
                          warningStatus: 0,
                          changedRows: 1
                        }
                */
                if (error) {
                    log.debug("function create(Promise({})) have the problem and cause : " + error.message)
                    throw error
                } else {
                    return resolve(info)
                }
            })
        }) // Promise
    }

    update = (productName, productPrice, productStatus, toyId) => {
        return new Promise((resolve, reject) => {
            pooling.query(directSql.update, [productName, productPrice, productStatus, toyId], (error, info) => {
                if (error) {
                    log.debug("function update(Promise({})) have the problem and cause : " + error.message)
                    throw error
                } else {
                    return resolve(info)
                }
            })
        }) // Promise
    }

    reads = () => {
        return new Promise((resolve, reject) => {
            pooling.query(directSql.reads, (error, info) => {
                if (error) {
                    log.debug("function reads(Promise({})) have the problem and cause : " + error.message)
                    throw error
                } else {
                    return resolve(info)
                }
            }) // ended query
        }) // ended returns
    }

    read = (toyId) => {
        return new Promise((resolve, reject) => {
            pooling.query(directSql.read, [toyId], (error, info) => {
                console.log(info)
                if (error) {
                    log.debug("function read(Promise({})) have the problem and cause : " + error.message)
                    throw error
                } else {
                    return resolve(info)
                }
            }) // ended query
        }) // ended returns
    }

    delete = (toyId) => {
        return new Promise((resolve, reject) => {
            pooling.query(directSql.delete, [toyId], (error, info) => {
                console.log(info)
                if (error) {
                    log.debug("function delete(Promise({})) have the problem and cause : " + error.message)
                    throw error
                } else {
                    return resolve(info)
                }
            }) // ended query
        }) // ended returns
    }
}
module.exports = CrudService