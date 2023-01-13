const express = require('express')
const router = express.Router()


const authCheck = require('../middleware/authCheck')

const {getProducts, addProduct, deleteProduct} = require('../controllers/productController')

router.get('/', getProducts)

router.use(authCheck)

router.post('/', addProduct)

router.delete('/:id', deleteProduct)


module.exports = router