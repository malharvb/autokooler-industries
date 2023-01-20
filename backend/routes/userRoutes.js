const express = require('express')
const router = express.Router()

const { signin, changePassword } = require('../controllers/userController')

router.post('/', signin)
router.patch('/', changePassword)

module.exports = router