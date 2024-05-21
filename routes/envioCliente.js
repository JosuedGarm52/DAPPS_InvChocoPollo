const express = require('express');
const router = express.Router();
const envClientesController = require('../controllers/envioClientes');
router.get('/clientes',async (req,res)=>{
    try{
        let sales = await envClientesController.getClientes()
        res.json(sales);
    }catch(ex){
        res.status(500).json({ message: ex.message });
    }
});
router.post('/cliente',async (req,res)=>{
    try{
        let sale = await envClientesController.CreateCliente(
            req.body.Tienda, 
            req.body.Encargado, 
            req.body.direccion, )
        res.json(sale);
    }catch(ex){
        res.status(500).json({ message: ex.message });
    }
});

router.delete('/cliente/:id', async (req, res) => {
    try {
        let pollo = await envClientesController.deleteCliente(req.params.id);
        res.json(pollo);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});


module.exports = router;