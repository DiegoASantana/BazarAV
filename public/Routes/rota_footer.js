// IMPORTAÇÕES
    const express = require('express');
    const router = express.Router();

router.get('/nossaHistoria', (req,res)=>{
    res.render('nossahistoria');
})

router.get('/quemSomos', (req,res)=>{
    res.render('quemSomos');
})

router.get('/sejaUmDoador', (req,res)=>{
    res.render('sejaUmDoador');
})


module.exports = router;