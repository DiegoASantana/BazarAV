const express = require('express');
const router = express.Router();
const Usuario = require('../../Models/Usuarios');
const Itens = require('../../Models/Itens');
const { Op } = require('sequelize');




router.get('/teste', (req,res) =>{
    let codReferencia = req.query.codReferencia;
    
    console.log('variavél:' + codReferencia)

    Itens.findAll({where: {ITM_CodReferencia: codReferencia}}).then((itens)=>{
        if(req.session.usuario){
            var usuarioSessao = req.session.usuario
            res.render('item', {itens: itens, usuario: usuarioSessao, redirectUrl: codReferencia})
        }else{
            res.render('item', {itens: itens, redirectUrl: codReferencia})
        }
    })
})



module.exports = router;