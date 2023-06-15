const express = require('express');
const router = express.Router();
const Usuario = require('../../Models/Usuarios');
const Itens = require('../../Models/Itens');
const { Op } = require('sequelize');
const Correios = require('node-correios');
const correios = new Correios();




router.get('/', (req,res)=>{
    let carrinho = req.session.carrinho
    if(carrinho){
        Itens.findAll({where: {ITM_IdItem: {[Op.in]: carrinho}}}).then((itens)=>{
            if(req.session.usuario){
                var usuarioSessao = req.session.usuario
                res.render('carrinho', {itens: itens, usuario: usuarioSessao})
            }else{
                let redirectUrl = '/carrinho'
                res.render('login', {redirectUrl: redirectUrl});
            }
        })
    }else{
        if(req.session.usuario){
            var usuarioSessao = req.session.usuario
            console.log('foi para a página da mensagem com Usuario')
            res.render('mensagens', {usuario: usuarioSessao})
        }else{
            console.log('foi para a página da mensagem')
            res.redirect('/carrinho/mensagem')
        }
    }

})


router.get('/calcular_frete/:cep', async (req,res)=>{
    const cep = req.params.cep;

    try {
        const dadosFrete = await calcularFrete(cep);
        console.log(dadosFrete)

        // Envie os dados do frete para o cliente
        res.json(dadosFrete);
    } catch (error) {
        console.error('Erro ao calcular frete:', error);
        res.status(500).json({ error: 'Erro ao calcular o frete' });
    }
});

function calcularFrete(cep) {
    return new Promise((resolve, reject) => {
        const params = {
            sCepOrigem: '08110-070',
            sCepDestino: cep,
            nVlPeso: '1.5',
            nCdFormato: 1,
            nVlComprimento: 20,
            nVlAltura: 10,
            nVlLargura: 15,
            nVlDiametro: 0,
            sCdMaoPropria: 'N',
            nCdServico: '04014' // Código do serviço desejado (exemplo: 04014 para SEDEX)
        };
  
        correios.calcPrecoPrazo(params)
        .then(result => {
            console.log(result);
            // Faça o processamento dos dados do frete aqui, se necessário
            resolve(result);
        })
        .catch(error => {
            console.log('Erro ao calcular frete:', error);
            reject(error);
        });
    });
}


router.get('/mensagem', (req,res)=>{
    res.render('mensagens')
})

module.exports= router;