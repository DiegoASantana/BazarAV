// IMPORTAÇÕES
    const express = require('express');
    const router = express.Router();

router.get('/nossaHistoria', (req,res)=>{
    if(req.session.usuario){
        var usuarioSessao = req.session.usuario;
        res.render('nossahistoria', {usuario: usuarioSessao});
    }else{
        res.render('nossahistoria');
    }
})

router.get('/quemSomos', (req,res)=>{
    if(req.session.usuario){
        var usuarioSessao = req.session.usuario;
        res.render('quemSomos', {usuario: usuarioSessao});
    }else{
        res.render('quemSomos');
    }
})

router.get('/sejaUmDoador', (req,res)=>{
    if(req.session.usuario){
        var usuarioSessao = req.session.usuario;
        res.render('sejaUmDoador', {usuario: usuarioSessao});
    }else{
        res.render('sejaUmDoador');
    }
})


module.exports = router;