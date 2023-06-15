// IMPORTAÇÕES
    const express = require('express');
    const router = express.Router();
    const Itens = require('../../Models/Itens');
    const { Op } = require('sequelize');


router.get('/r', (req,res)=>{
    let classificacao = req.query.classificacao;
    let item = req.query.item;
    let genero = req.query.genero;
    let tipo = req.query.tipo;


    Itens.findAll({where:{
        ...(classificacao && {ITM_Classificacao: classificacao}),
        ...(tipo && {ITM_Tipo: tipo}),
        ...(genero && {ITM_Sexo: genero}),
        ...(item && {ITM_PalavrasChave: {
            [Op.like]: `%${item}%`
        }})
    }})
    .then(function (itens) {
        if(req.session.usuario){
            var usuarioSessao = req.session.usuario;
            res.render('setor', { itens: itens, genero: genero, item: item, classificacao: classificacao, tipo: tipo, usuario: usuarioSessao } );
        }else{
            res.render('setor', { itens: itens, genero: genero, item: item, classificacao: classificacao,  tipo: tipo} );
        }
    })
    .catch((error)=>{
        res.send({message: 'Erro na requisação dos links: ', error})
    })
});

/*
router.get('/Adulto/:genero', (req,res)=>{
let genero = req.params.genero
let redirectUrl = `setor/Adulto/${genero}`
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


router.get('/:genero/p', (req,res)=>{
const genero = req.params.genero
const item = req.query.item
const classificacao = req.query.classificacao;
let redirectUrl = `setor/${genero}/p`

Itens.findAll({where:{
    ITM_Sexo: genero,
    ITM_Classificacao: classificacao,
    ITM_PalavrasChave:{
        [Op.like]: `%${item}%`
    }
}})
.then((item)=>{
    if(req.session.usuario){
        var usuarioSessao = req.session.usuario;
        console.log(usuarioSessao)
        res.render('genero', {itens: item, genero: genero, redirectUrl: redirectUrl, usuario: usuarioSessao});
    }else{
        res.render('genero', {itens: item, genero: genero, redirectUrl: redirectUrl});
    }
});


});
*/

module.exports = router;