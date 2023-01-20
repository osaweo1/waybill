require('dotenv').config()

const express = require('express')
const expressLayout = require('express-ejs-layouts')
// import printJS from 'print-js'




const app=express()
const flash=require('connect-flash')
const session=require('express-session')
const port = process.env.PORT||5000
const router=require('./server/routes/route')
const cookie=require('cookie-parser')


app.use(flash())
app.use(express.static('./public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(expressLayout)
app.use(session({
    secret:"helloword",
    resave:false,
    saveUninitialized:true
}))
app.use(cookie())
app.use(router)
app.set('layout','layout/main')
app.set('view engine','ejs')



// app.use(printJS())



// app.get('/index',(req,res)=>{
//     res.send('welcome to our home')
// })



// app.get('*',checkUser)
app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})





