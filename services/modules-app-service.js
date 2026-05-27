class ModulesAppService {
    static get express() {
        return require('express')
    }
    static get bodyParser() {
        return require('body-parser')
    }
    static get mysql2() {
        return require('mysql2')
    }
    static get path() {
        return require('path')
    }
}

module.exports = ModulesAppService