const express = require('express');
const multer = require('multer')
const app = express()
const path = require('path')
const fs = require('fs')
const { error } = require('console');
const chocoRoutes = require('./routes/chocolate.js')
const polloRoutes = require('./routes/pollo.js')
const envioClienteRoutes = require('./routes/envioCliente.js')
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static(path.join(__dirname, 'page')));

app.use(bodyParser.json())
app.use('/api',chocoRoutes)
app.use('/api',polloRoutes)
app.use('/api',envioClienteRoutes)

app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req, res) =>{
    res.send('¡Bienvenido!');
})
app.get('/Home',(req, res) =>{
    res.sendFile(path.join(__dirname,'page/home.html'))
})
app.get('/chocolate-inventory',(req, res) =>{
    res.sendFile(path.join(__dirname,'page/chocolate-inventory.html'))
})
app.get('/pollo-inventory',(req, res) =>{
    res.sendFile(path.join(__dirname,'page/pollo-inventory.html'))
})
app.get('/envCliente-inventory',(req, res) =>{
    res.sendFile(path.join(__dirname,'page/envCliente-inventory.html'))
})
app.get('/detalleChocolate', (req, res) => {
    res.sendFile(path.join(__dirname, 'page/detalleChocolate.html'));
});
app.get('/detallePollo', (req, res) => {
    res.sendFile(path.join(__dirname, 'page/detallePollo.html'));
});

app.get('/addChocolate', (req, res) => {
    res.sendFile(path.join(__dirname, 'page/addChocolate.html'));
});

app.get('/addPollo', (req, res) => {
    res.sendFile(path.join(__dirname, 'page/addPollo.html'));
});

app.get('/addCliente', (req, res) => {
    res.sendFile(path.join(__dirname, 'page/addCliente.html'));
});

app.get('/putChocolate', (req, res) => {
    res.sendFile(path.join(__dirname, 'page/putChocolate.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log('server running on port '+ PORT))