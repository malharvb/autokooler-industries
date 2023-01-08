const Product = require('../models/productModel')
const mongoose = require('mongoose')

const upload = require('../middleware/imageMiddleware')
const fs = require('fs')

const getProducts = async (req, res) => {
    const products = await Product.find().sort({name: 'asc'})

    if(!products) {
        return res.status(400).json({error: 'Invalid Request'})
    }
    
    res.status(200).json(products)
}

const addProduct = (req, res) => {
    
    upload(req, res, async () => {
        const productObj = {
            name: req.body.name,
            img: {
                data: fs.readFileSync('./uploads/' + req.file.filename),
                contentType: 'image/jpg'
            }
        }

        const product = await Product.create(productObj)
        
        if (product) {
            res.status(200).json(product)
        }
        else {
            res.status(400).json({error: 'Incomplete form data provided'})
        }
        fs.rmSync(('./uploads/' + req.file.filename))

    })
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid product id"})
    }

    const product = await Product.findOneAndDelete({_id: id})

    if (product) {
        return res.status(200).json(product)
    }

    res.status(400).json({error: 'No such product'})

}

module.exports = { getProducts, addProduct, deleteProduct }