require('dotenv').config()

const express = require('express')
const server = express()

server.use(express.urlencoded({extended: true}))
server.use(express.json())

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log('Excute'))

module.exports = server