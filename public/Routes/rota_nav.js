// IMPORTAÇÕES
    const express = require('express');
    const router = express.Router();
    const Itens = require('../../Models/Itens');


    
router.get('/:genero', (req,res)=>{
    let genero = req.params.genero
    let redirectUrl = `link/${genero}`
    console.log(redirectUrl)
    if(req.session.usuario){
        var usuarioSessao = req.session.usuario;
        Itens.findAll({where:{ITM_Sexo: genero}}).then(function (itens) {

            res.render('genero', { itens: itens, genero: genero, usuario: usuarioSessao, redirectUrl: redirectUrl } );
        });
    }else{
        Itens.findAll({where:{ITM_Sexo: genero}}).then(function (itens) {
            res.render('genero', { itens: itens, genero: genero, redirectUrl: redirectUrl } );
        });
    }

});

module.exports = router;