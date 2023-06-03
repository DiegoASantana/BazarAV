// IMPORTAÇÕES
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    const port = process.env.PORT || 8081;
    const Itens = require('./Models/Itens');
    const { Op } = require('sequelize');
    const { Sequelize } = require('./Models/db');
    const Oper = Sequelize.Op;
    const session = require('express-session');
    const Usuario = require('./Models/Usuarios');



// Config
	// Template Engine
        app.set('views','./views');
        app.set('view engine', 'ejs');
        app.engine('html', require('ejs').renderFile);

    // Body Parser
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        app.use(express.static(__dirname + '/public'));
        app.use(express.static(__dirname + '/views'));
        app.use(session({
            secret: 'teste diego',
            resave: false,
            saveUninitialized: false
        }));

    // ROTAS EXTERNAS
        app.use('/',require('./public/Routes/rota_footer'));
        app.use('/login',require('./public/Routes/rota_login'));
        app.use('/link',require('./public/Routes/rota_nav'));





app.get('/', (req,res)=>{
    //const itemIds = [5,3,2,4,1]
    console.log(req.session.usuario)
    if(req.session.usuario){
        console.log('Usuario Autenticado')
        Itens.findAll().then(function (itens) {
            res.render('index', { itens: itens});
        });
    }else{
        console.log('Usuario NÃO Autenticado')
        Itens.findAll().then(function (itens) {
            res.render('index', { itens: itens});
        });
    }
    
})




// Função para gerar números aleatórios
function generateRandomNumbers(count, min, max) {
const randomNumbers = [];
while (randomNumbers.length < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
    }
}
return randomNumbers;
}


app.get('/roupa/:id', (req,res) =>{
    let id_Item = req.params.id
    Itens.findAll({where: {ITM_IdItem: id_Item}}).then(function(itens){
        res.render('item', {itens: itens})
    })
})


app.get('/pesquisa/:pesquisa', (req,res)=>{
    let parametro = req.params.pesquisa
    Itens.findAll({
        where:{
            [Oper.or]:[
                {ITM_Sexo: parametro},
                {ITM_Marca: parametro},
                {ITM_Descricao:{
                    [Oper.like]:`%${parametro}%`
                }},
                {ITM_Item:{
                    [Oper.like]:`%${parametro}%`
                }}
            ]
            
        }
    }).then(function (itens) {
        //res.status(201).json(itens)
        res.render('pesquisa', { itens: itens, pesquisa: parametro });
    });
    
});





app.listen(port, () =>{
    console.log("Projeto executando na porta: " + port);
})







/*
app.get('/', (req,res)=>{
    const itemIds = generateRandomNumbers(4, 1, 6);
    Itens.findAll({ where: { ITM_IdItem: { [Op.in]: itemIds } } }).then(function (itens) {
        console.log(itens);
        res.render('index', { itens: itens });
    });
    
})

// Função para gerar números aleatórios
function generateRandomNumbers(count, min, max) {
const randomNumbers = [];
while (randomNumbers.length < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
    }
}
return randomNumbers;
}
*/