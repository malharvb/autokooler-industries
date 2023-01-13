const express = require('express')
const router = express.Router()

const {getInventory, getStock, addStock, deleteStock, addStockItem, deleteStockItem, updateCount, resetDate} = require('../controllers/privateStockController')

const authCheck = require('../middleware/authCheck')

router.use(authCheck)

router.get('/', getInventory)

router.get('/:id', getStock)

router.post('/', addStock)

router.delete('/:id', deleteStock)

router.patch('/item', addStockItem)

router.patch('/item/count', updateCount)

router.patch('/item/resetDate', resetDate)

router.delete('/item/:itemId', deleteStockItem)


module.exports = router