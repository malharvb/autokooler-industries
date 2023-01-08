require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

const port = process.env.PORT || 4000

app.use(express.json())

app.use('/api/user', userRoutes)

app.use('/api/product', productRoutes)

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
.then(
    app.listen(port, () => {
    console.log('Server Running')
    }
))
.catch(
    (err) => console.log(err)
)