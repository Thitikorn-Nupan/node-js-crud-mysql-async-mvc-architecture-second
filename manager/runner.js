const application = require('../services/modules-app-service').express()
const router = require('../router/router')
const log = require('../log/logging').logger

application.set('view engine', 'ejs');
application.use(router).listen(3000 , (error) => {
    if (error)  log.debug("found some errors on port 3000 and cause : "+error)
})
