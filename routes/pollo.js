const express = require('express');
const router = express.Router();
const pollosController = require('../controllers/pollos');
router.get('/pollos',async (req,res)=>{
    try{
        let sales = await pollosController.getPollos()
        res.json(sales);
    }catch(ex){
        res.status(500).json({ message: ex.message });
    }
});
router.get('/pollo/:id',async (req,res)=>{
    try{
        console.log(req.params)
        let sale = await pollosController.getPollo(req.params.id)
        res.json(sale);
    }catch(ex){
        res.status(500).json({ message: ex.message });
    }
});
router.post('/pollo',async (req,res)=>{
    try{
        let sale = await pollosController.CreatePollo(req.body.color, req.body.size, req.body.sexo, req.body.precio, req.body.cantidadExistencia)
        res.json(sale);
    }catch(ex){
        res.status(500).json({ message: ex.message });
    }
});

router.put('/pollo/:id', async (req, res) => {
    try {
        let pollo = await pollosController.updatePollo(
            req.params.id,
            req.body.color,
            req.body.size,
            req.body.sexo,
            req.body.precio,
            req.body.cantidadExistencia
        );
        res.json(pollo);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.delete('/pollo/:id', async (req, res) => {
    try {
        let pollo = await pollosController.deletePollo(req.params.id);
        res.json(pollo);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});


module.exports = router;