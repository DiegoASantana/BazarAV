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
        app.use('/setor',require('./public/Routes/rota_nav'));
        app.use('/login',require('./public/Routes/rota_login'));
        app.use('/cadastrar',require('./public/Routes/rota_cadastrar'));




app.get('/', (req,res)=>{
    //const itemIds = [5,3,2,4,1]
    let redirectUrl = `/`

    Itens.findAll().then(function (itens) {
        if(req.session.usuario){
            var usuarioSessao = req.session.usuario;
            res.render('index', { itens: itens, usuario: usuarioSessao, redirectUrl: redirectUrl });
        }else{
            res.render('index', { itens: itens, redirectUrl: redirectUrl });
        }
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


app.get('/roupa/r', (req,res) =>{
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

app.get('/pesquisa/:pesquisa', (req, res) => {
    const parametro = req.params.pesquisa;
    let redirectUrl = `/pesquisa/${parametro}`
    const palavras = parametro.split(' '); // Dividir a string em palavras individuais
    const palavrasFiltradas = palavras.filter((palavra)=> palavra.length >=3)
    const conditions = palavrasFiltradas.map((palavra) => ({
        [Op.or]: [
            { ITM_Sexo: palavra },
            { ITM_Marca: palavra },
            { ITM_CodReferencia: palavra },
            { ITM_Descricao: { [Op.like]: `%${palavra}%` } },
            { ITM_Item: { [Op.like]: `%${palavra}%` } },
            { ITM_PalavrasChave: { [Op.like]: `%${palavra}%` } }
        ]
    }));

    Itens.findAll({ where: { [Op.and]: conditions } }).then((itens) => {
        if (req.session.usuario) {
            const usuarioSessao = req.session.usuario;
            res.render('pesquisa', { itens: itens, pesquisa: parametro, usuario: usuarioSessao, redirectUrl: redirectUrl });
        } else {
            res.render('pesquisa', { itens: itens, pesquisa: parametro, redirectUrl: redirectUrl });
        }
    });
});



app.get('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.error('Erro ao encerrar a sessão: ' + err);
        }else{
            res.redirect('/');
        }
    })
})

app.get('/teste', (req,res)=>{
    res.render('teste')
})


app.listen(port, () =>{
    console.log("Projeto executando na porta: " + port);
})

