// IMPORTAÇÕES
const express = require('express');
const router = express.Router();

router.get('/nossaHistoria', (req,res)=>{
let redirectUrl = `/nossaHistoria`
if(req.session.usuario){
    var usuarioSessao = req.session.usuario;
    res.render('nossahistoria', {usuario: usuarioSessao, redirectUrl: redirectUrl});
}else{
    res.render('nossahistoria',{redirectUrl: redirectUrl});
}
})

router.get('/quemSomos', (req,res)=>{
let redirectUrl = `/quemSomos`
if(req.session.usuario){
    var usuarioSessao = req.session.usuario;
    res.render('quemSomos', {usuario: usuarioSessao, redirectUrl: redirectUrl});
}else{
    res.render('quemSomos', {redirectUrl: redirectUrl});
}
})

router.get('/sejaUmDoador', (req,res)=>{
let redirectUrl = `/`
if(req.session.usuario){
    var usuarioSessao = req.session.usuario;
    res.render('sejaUmDoador', {usuario: usuarioSessao, redirectUrl: redirectUrl});
}else{
    res.render('sejaUmDoador', {redirectUrl: redirectUrl});
}
})


module.exports = router;