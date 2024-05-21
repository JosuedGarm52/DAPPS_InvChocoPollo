const express = require('express');
const router = express.Router();
const chocolatesController = require('../controllers/chocolates');
router.get('/chocolates',async (req,res)=>{
    try{
        let sales = await chocolatesController.getChocolates()
        res.json(sales);
    }catch(ex){
        res.status(500).json({ message: ex.message });
    }
});
router.get('/chocolate/:id',async (req,res)=>{
    try{
        console.log(req.params)
        let sale = await chocolatesController.getChocolate(req.params.id)
        res.json(sale);
    }catch(ex){
        res.status(500).json({ message: ex.message });
    }
});
router.post('/chocolate',async (req,res)=>{
    try{
        let sale = await chocolatesController.CreateChocolate(req.body.nombre, req.body.tipo, req.body.descripcion, req.body.precio, req.body.cantidadExistencia)
        res.json(sale);
    }catch(ex){
        res.status(500).json({ message: ex.message });
    }
});

router.put('/chocolate/:id', async (req, res) => {
    try {
        let chocolate = await chocolatesController.updateChocolate(
            req.params.id,
            req.body.nombre,
            req.body.tipo,
            req.body.descripcion,
            req.body.precio,
            req.body.cantidadExistencia
        );
        res.json(chocolate);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});

router.delete('/chocolate/:id', async (req, res) => {
    try {
        let chocolate = await chocolatesController.deleteChocolate(req.params.id);
        res.json(chocolate);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
});


module.exports = router;