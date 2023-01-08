const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        img: {   
            data: Buffer, 
            contentType: String 
        }

    }
,  {timestamps: true})


module.exports = mongoose.model('Product', productSchema)