const express = require('express')
const router = express.Router()

const perfilController = require('../controller/perfilController')

perfilController(router)
module.exports = router