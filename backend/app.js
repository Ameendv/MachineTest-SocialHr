const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express=require('express')
const app=express()
const cors=require('cors')


require('dotenv').config()
const mongoose=require('mongoose')

const adminRoutes=require('./routes/admin/admin')

mongoose.connect('mongodb://localhost:27017/SocialHr').then((done,error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('Database is connected')
    }
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/admin',adminRoutes)

app.use((err, req, res, ) => {
    const errorStatus = err.status || 500
  
    const errorMessage = err.message || 'Something went wrong !'
  
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack
    })
  })


  // eslint-disable-next-line no-undef
  const PORT = process.env.PORT || 4000


app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)
})



