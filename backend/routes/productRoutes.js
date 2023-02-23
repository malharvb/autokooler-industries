const express = require('express')
const router = express.Router()

const upload = require('../middleware/imageMiddleware')
const authCheck = require('../middleware/authCheck')

const {getProducts, addProduct, deleteProduct} = require('../controllers/productController')

router.get('/', getProducts)

router.use(authCheck)

router.post('/', upload.single('image') ,addProduct)

router.delete('/:id', deleteProduct)


module.exports = router