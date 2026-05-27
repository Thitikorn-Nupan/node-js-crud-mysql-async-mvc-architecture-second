const CrudService = require('../services/crud-service')
const log = require('../log/logging').logger
const path = require('../services/modules-app-service').path
const express = require('../services/modules-app-service').express
const router = require('../services/modules-app-service').express.Router()
const bodyParser = require('../services/modules-app-service').bodyParser

const crudService = new CrudService()

// set middleware for post method
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))


// set path for showing ejs file and static files
// using .resolve("./") method instead .join(__dirname) because (./) Used to display the path where the terminal is opened
// So it's good when you deploy application to server
let ejs = path.resolve("../ui/views");
let staticFiles = path.resolve("../ui");
router.use(express.static(staticFiles))


router.get('/', (req, res) => res.render(ejs + '/activity-home'))

router.get('/views', async (req, res) => {
    try {
        const list = await crudService.reads()
        log.info(JSON.stringify(list))
        res.render(ejs + '/activity-views', {list: list})
    } catch (error) {
        log.debug("router's get('/view') method have the problem and cause : " + error.message)
        throw error
    }
})

router.get('/api/edit/(:id)', async (req, res) => {
    try {
        const toy = await crudService.read(req.params["id"]).then((toy) => {
            res.render(ejs + '/activity-edit', {
                tid: toy[0].tid,
                name: toy[0].name,
                price: toy[0].price
            })
        }).catch((error) => {
            log.info("catch() method in read async it's working and cause : " + error)
            res.redirect('/views')
        })
    } catch (error) {
        log.debug("router's get('/api/edit/(:id)') method have the problem and cause : " + error.message)
        throw error
    }
})
router.get('/api/delete/(:id)', async (req, res) => {
    try {
         await crudService.delete(req.params["id"]).then(() => {
            res.redirect('/views')
        }).catch((error) => {
            log.info("catch() method in delete async it's working and cause : " + error)
            res.redirect('/')
        })
    } catch (error) {
        log.debug("router's get('/api/edit/(:id)') method have the problem and cause : " + error.message)
        throw error
    }
})

router.post('/api/create', async (req, res) => {
    try {
        const {name, price, status} = req.body;
        const release_date = crudService.formatDatetimeSql()
        await crudService.create(name, price, status, release_date)
        res.redirect('/views')
    } catch (error) {
        log.debug("router's post('/api/create') method have the problem and cause : " + error.message)
        throw error
    }
})

router.post('/api/edit', async (req, res) => {
    try {
        const {name, price, status, tid} = req.body;
        await crudService.update(name, price,status, tid)
        res.redirect('/views')
    } catch (error) {
        log.debug("router's post('/api/edit') method have the problem and cause : " + error.message)
        throw error
    }
})

module.exports = router