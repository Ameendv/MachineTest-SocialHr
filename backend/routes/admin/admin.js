const express = require('express')
const app = express()
require('dotenv').config()
const adminController = require('../../controller/admin/admin')
const { authenticateToken } = require('../../middleware/authToken')

app.post('/api/signup', adminController.signup)

app.post('/api/login', adminController.login)

app.post('/api/addBook', authenticateToken, adminController.addBook)

app.get('/api/getBookDetails', authenticateToken, adminController.getBookDetails)

app.get('/api/getAllBookDetails', authenticateToken, adminController.getAllBookDetails)

app.patch('/api/updateBook', authenticateToken, adminController.updateBook)

app.delete('/api/deleteBook', authenticateToken, adminController.deleteBook)


module.exports = app;