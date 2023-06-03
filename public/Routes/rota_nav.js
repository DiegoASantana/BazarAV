// IMPORTAÇÕES
    const express = require('express');
    const router = express.Router();
    const Itens = require('../../Models/Itens');


    
router.get('/:genero', (req,res)=>{
    let genero = req.params.genero
    Itens.findAll({where:{ITM_Sexo: genero}}).then(function (itens) {
        console.log(itens);
        res.render('genero', { itens: itens, genero: genero } );
    });

});

module.exports = router;