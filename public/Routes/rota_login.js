// IMPORTAÇÕES
    const express = require('express');
    const router = express.Router();
    const Usuario = require('../../Models/Usuarios');
    const transporter = require('../../Models/Email');
    const bcrypt = require('bcrypt');


router.get('/l', (req,res)=>{
// Salve a URL da página anterior como uma query string
const redirectUrl = req.query.redirect || '/';
console.log(redirectUrl)

// Renderize a página de login, passando a URL da página anterior como um parâmetro

res.render('login', { redirectUrl });
})


router.post('/eftuar_login', (req,res)=>{
    let email = req.body.email;
    let senha = req.body.senha;
    Usuario.findAll({where:{USR_Email: email}}).then((result)=>{
        if(result.length > 0){
            const same = bcrypt.compareSync(senha, result[0].USR_Senha);
            if(same){
                let nome = result[0].USR_NomeCompleto.split(" ")[0];
                req.session.usuario = nome;
                //res.redirect('/')
                return res.json({success: true});
            }else{
                console.log("Senha no banco: " +result[0].USR_Senha + " \nNão confere com senha colocada: " +senha);
                //return res.send({error: 'Senha não confere'});
                return res.json({sucess: false, message: 'Senha Incorreta'})
            } 
        }else{
            return res.json({sucess: false, message: 'Usuário não Cadastrado'})
        }
    })
})

router.post('/recupera_Senha', async (req,res)=>{
    let login = req.query.login;

    console.log(login);

    Usuario.findOne({where:{USR_Email: login}}).then((usuario)=>{
        if(usuario){
            console.log(usuario)
            let senha = usuario.USR_Senha;
            enviaEmail(login, senha);
            return res.json({success: true});
            /*res.redirect('/login/l?mensagem=' + encodeURIComponent(mensagemCadastro));*/
        }else{
            return res.json({success: false});
        }
    })

    function enviaEmail(email, senha){
        transporter.sendMail({
            from: "Bazar - Projeto Alimentado Vidas <diego.alves.santana@hotmail.com>",
            to: email,
            subject: 'Recuperação de senha - Bazar P.A.V.',
            text: "Aqui estou testando o texto",
            html: `Sua senha para acesso ao sistema é: <strong>${senha}</strong><br>
            <a href='http://localhost:8081/login/l'>Clique aqui</a> para ser redirecionado ao Bazar do Projeto Alimentando Vidas`
        })
        .then(message => {
            console.log(message);
        }).catch (err =>{
            console.log(err);
        })
    }
})



module.exports = router;