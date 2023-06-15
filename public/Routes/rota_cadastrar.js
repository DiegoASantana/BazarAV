const express = require('express');
const router = express.Router();
const Usuario = require('../../Models/Usuarios');
const transporter = require('../../Models/Email');
const bcrypt = require('bcrypt');


router.get('/', (req,res)=>{
    let redirectUrl = `/cadastrar`
    if(req.session.usuario){
        var usuarioSessao = req.session.usuario;
        res.render('cadastro', {usuario: usuarioSessao, redirectUrl: redirectUrl});
    }else{
        res.render('cadastro',{redirectUrl: redirectUrl});
    }

})

router.post('/efetuar_cadastro', (req, res)=>{
    let redirectUrl = `/`

    let nomeCompleto = req.body.nome;
    let telefone = req.body.telefone;
    let email = req.body.email;
    let senha = req.body.password;
    console.log(
        `Nome: ${nomeCompleto}
        Telefone: ${telefone}
        Email: ${email}
        Senha: ${senha}`
    );
    
    let senhaCrip =  bcrypt.hashSync(senha,10);
    console.log(senhaCrip)
    Usuario.max('USR_IdUsuario').then((USR_IdUsuario)=>{
        let idUsuario = USR_IdUsuario+1;

        Usuario.create({
            USR_IdUsuario: idUsuario,
            USR_NomeCompleto: nomeCompleto,
            ...(telefone && {USR_NumCelular: telefone}),
            USR_Email: email,
            USR_Senha: senhaCrip
        })
        .then((usuario)=>{
            let nome = nomeCompleto.split(" ")[0];
            enviaEmailCadastro(nome, email);
            var mensagemCadastro = 'Parabéns, seu usuário foi cadastrado!\n Realize o Login.';
            //window.location.href = '/login?mensagem=' + encodeURIComponent(mensagemCadastro);
            res.redirect('/login/l?mensagem=' + encodeURIComponent(mensagemCadastro));
        })
        .catch((error)=>{
            res.status(404).send({message: 'Houve um erro na criação do Usuario: ', error})
        });
    })

    function enviaEmailCadastro(nome, email){
        transporter.sendMail({
            from: "Bazar - Projeto Alimentado Vidas <diego.alves.santana@hotmail.com>",
            to: " dih.a.santana@gmail.com",
            subject: 'Bem Vindo ao Bazar P.A.V.',
            text: "Aqui estou testando o texto",
            html: `Olá <strong>${nome}</strong>! É um prazer tê-lo conosco.<br>
            Realize o login através do link <a href='http://localhost:8081/login/l'>Clique aqui</a> para ser redirecionado ao Bazar do Projeto Alimentando Vidas${email}`
        })
    }
    
})

router.post('/validaEmail', async (req,res)=>{
    const {email} = req.body;

    try{
        const usuario = await Usuario.findOne({where:{ USR_Email: email}});
        if(usuario){
            console.log(usuario)
            res.send('existe'); // Se o e-mail ja existir cadastrado, será enviado essa mensagem 
        } else{
            res.send('nao_existe'); // E-mail não existe
        }
    }catch(error){
        console.log(error);
        res.status(500).send('Erro ao verificar o e-mail'); // Em caso de erro, envie uma resposta de erro
    }

})



module.exports = router;