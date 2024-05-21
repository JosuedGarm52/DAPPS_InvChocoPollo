const express = require('express');
const multer = require('multer')
const app = express()
const path = require('path')
const fs = require('fs')
const { error } = require('console');
const chocoRoutes = require('./routes/chocolate.js')
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use('/api',chocoRoutes)

app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req, res) =>{
    res.send('¡Bienvenido!');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log('server running on port '+ PORT))