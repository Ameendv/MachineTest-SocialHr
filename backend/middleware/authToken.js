
const jwt = require('jsonwebtoken')
const {createError} =require('../createError/createError')


module.exports = {
    authenticateToken: (req, res, next)=>{

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return next(createError(403, 'Authentication failed'))
            req.user = user
            next()
        })
    }
}