const express = require('express')
const app = express()
require('dotenv').config()
const adminController = require('../../controller/admin/admin')
const jwt = require('jsonwebtoken')
const { createError } = require('../../createError/createError')

app.post('/api/login', adminController.login)

app.post('/api/addBook',authenticateToken,adminController.addBook)

app.get('/api/getBookDetails',authenticateToken,adminController.getBookDetails)

app.delete('/api/deleteBook',authenticateToken,adminController.deleteBook)




 

function authenticateToken(req, res, next) {

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

module.exports = app;