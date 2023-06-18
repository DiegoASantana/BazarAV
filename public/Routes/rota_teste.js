const express = require('express');
const router = express.Router();
const Usuario = require('../../Models/Usuarios');
const Itens = require('../../Models/Itens');
const { Op } = require('sequelize');


router.get('/teste', (req,res)=>{
    res.render('teste')
})




module.exports = router;