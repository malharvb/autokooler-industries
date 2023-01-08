const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

const signin = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.signin(username, password)

        const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: '2d'})

        res.status(200).json({username,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { signin }