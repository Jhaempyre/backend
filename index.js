const express = require('express')
require('dotenv').config()

const app = express()

const PORT = 4000
app.get('/radha',(req,res)=>{
    res.send("<h1>jai shree radha</h1>")

})

app.listen(process.env.PORT,(req,res)=>{
    console.log(`gungan happening at ${PORT}`)
})