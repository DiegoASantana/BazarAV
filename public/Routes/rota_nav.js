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
    let redirectUrl = '';

    if(classificacao && !genero && !item & !tipo){
        redirectUrl = `setor/r?classificacao=${classificacao}`;
    }else if(classificacao && genero && !item && !tipo){
        redirectUrl = `setor/r?classificacao=${classificacao}&genero=${genero}`;
    }else if(classificacao && genero && item && !tipo){
        redirectUrl = `setor/r?classificacao=${classificacao}&genero=${genero}&item=${item}`;
    }else if(classificacao && !genero && item && !tipo){
        redirectUrl = `setor/r?classificacao=${classificacao}&item=${item}`;
    }else if(classificacao && !genero && !item & tipo){
        redirectUrl = `setor/r?classificacao=${classificacao}tipo${tipo}`;
    }

   
    console.log(redirectUrl);

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
            res.render('setor', { itens: itens, genero: genero, item: item, classificacao: classificacao, tipo: tipo, redirectUrl: redirectUrl, usuario: usuarioSessao } );
        }else{
            res.render('setor', { itens: itens, genero: genero, item: item, classificacao: classificacao,  tipo: tipo, redirectUrl: redirectUrl } );
        }
    })
    .catch((error)=>{
        res.send({message: 'Erro na requisação dos links: ', error})
    })
});


module.exports = router;