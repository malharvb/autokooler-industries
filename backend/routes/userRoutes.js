const express = require('express')
const router = express.Router()

const { signin } = require('../controllers/userController')

router.post('/', signin)

module.exports = router