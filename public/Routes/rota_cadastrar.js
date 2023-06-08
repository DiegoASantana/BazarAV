const express = require('express');
const router = express.Router();
const Usuario = require('../../Models/Usuarios');


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

    let nome = req.body.nome;
    let telefone = req.body.telefone;
    let email = req.body.email;
    let senha = req.body.password;
    console.log(
        `Nome: ${nome}
        Telefone: ${telefone}
        Email: ${email}
        Senha: ${senha}`
    );
    Usuario.max('USR_IdUsuario').then((USR_IdUsuario)=>{
        let idUsuario = USR_IdUsuario+1;

        Usuario.create({
            USR_IdUsuario: idUsuario,
            USR_NomeCompleto: nome,
            ...(telefone && {USR_NumCelular: telefone}),
            USR_Email: email,
            USR_Senha: senha
        })
        .then((usuario)=>{
            res.redirect('/login/l');
        })
        .catch((error)=>{
            res.status(404).send({message: 'Houve um erro na criação do Usuario: ', error})
        });
    })
    
})



module.exports = router;