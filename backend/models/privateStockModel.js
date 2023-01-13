const mongoose = require('mongoose')

const privateStockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    items: [ {
        itemName: {
            type: String,
            required: true
        },
        itemCount: Number,
        rate: Number,
        lastSold: String,
        backupDate: String
        }
    ]
})

module.exports = mongoose.model('PrivateStock', privateStockSchema)