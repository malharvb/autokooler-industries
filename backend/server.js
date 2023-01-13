require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const privateStockRoutes = require('./routes/privateStockRoute')

const port = process.env.PORT || 4000

app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'build')));

app.use('/api/user', userRoutes)

app.use('/api/product', productRoutes)

app.use('/api/stock', privateStockRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

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