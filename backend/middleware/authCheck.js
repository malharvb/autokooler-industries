const jwt = require('jsonwebtoken')

const authCheck = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(400).json({error: 'No authorization header present'})
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.SECRET)
        req.body.user_id = id
        next()
    } catch {
        return res.status(400).json({error: 'Invalid token present'})
    }


}

module.exports = authCheck