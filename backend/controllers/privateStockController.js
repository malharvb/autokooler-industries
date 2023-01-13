const mongoose = require('mongoose')
const PrivateStock = require('../models/privateStockModel')

const getInventory = async (req, res) => {
    const stock = await PrivateStock.find()

    if(!stock) {
        res.status(400).json({error: 'Invalid Request'})
    }

    res.status(200).json(stock)
}

const getStock = async (req, res) => {
    const id = req.params.id

    const stock = await PrivateStock.findOne({_id: id})

    if(!stock) {
        res.status(400).json({error: 'Invalid Request'})
    }

    res.status(200).json(stock)
}

const addStock = async (req, res) => {
    const {name, type} = req.body

    const stock = await PrivateStock.create({name, type}) 

    if(!stock) {
        res.status(400).json({error: 'Invalid Request'})
    }

    res.status(200).json(stock)
}

const deleteStock = async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid stock id"})
    }

    const stock = await PrivateStock.findByIdAndDelete({_id: id})

    if(!stock) {
        return res.status(404).json({error: "No such stock available"})
    }

    res.status(200).json(stock)
}

const addStockItem = async (req, res) => {
    const { name, rate , id } = req.body
    

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid stock id"})
    }

    const stockItem = await PrivateStock.findOne({_id: id})

    if(!stockItem) {
        return res.status(404).json({error: 'Not a valid stock item'})
    }

    stockItem.items.push({itemName: name, itemCount: 0, rate})

    await stockItem.save()

    res.status(200).json(stockItem)
}

const deleteStockItem = async (req, res) => {
    const itemId = req.params.itemId
    const {id} = req.body
  
    if(!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(404).json({error: "Invalid id value"})
    }

    const stockItem = await PrivateStock.findOne({_id: id})

    if(!stockItem) {
        return res.status(404).json({error: 'Not a valid stock item'})
    }

    stockItem.items.pull({_id: itemId})

    await stockItem.save()

    res.status(200).json(stockItem)
}

const updateCount = async (req,res) => {
    const { count, itemId, id } = req.body
    
    let lastSold, backupDate

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid stock id"})
    }

    const query = { _id: id, "items._id": itemId };


    const beforeUpdate = await PrivateStock.findOne(query)
    
    const beforeUpdateItem = beforeUpdate.items.find((item) => item._id.toString() === itemId)
    
    if(parseInt(count) < parseInt(beforeUpdateItem.itemCount)) {
        backupDate = beforeUpdateItem.lastSold
        lastSold = new Date()
    }

    const updateDocument = {
        $set: { "items.$.itemCount": count, "items.$.lastSold": lastSold, "items.$.backupDate": backupDate }
    };

    const stockItem = await PrivateStock.updateOne(query, updateDocument);

    if(stockItem.modifiedCount == 0) {
        return res.status(404).json({error: 'No such stock item found'})
    }

    const updatedStockItem = await PrivateStock.findOne({_id: id})

    
    res.status(200).json(updatedStockItem)
}

const resetDate = async (req, res) => {
    const {itemId, id} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid stock id"})
    }

    const query = { _id: id, "items._id": itemId };


    const beforeUpdate = await PrivateStock.findOne(query)
    
    const beforeUpdateItem = beforeUpdate.items.find((item) => item._id.toString() === itemId)

    if (!beforeUpdateItem.backupDate) {
        return res.status(400).json({error: "Backup date already used"})
    }

    const lastSold = beforeUpdateItem.backupDate

    const updateDocument = {
        $set: { "items.$.lastSold": lastSold, "items.$.backupDate": null }
    };

    const stockItem = await PrivateStock.updateOne(query, updateDocument);

    if(stockItem.modifiedCount == 0) {
        return res.status(404).json({error: 'No such stock item found'})
    }

    const updatedStockItem = await PrivateStock.findOne({_id: id})

    res.status(200).json(updatedStockItem)

}


module.exports = {getInventory, getStock, addStock, addStockItem, deleteStockItem, deleteStock, updateCount, resetDate}