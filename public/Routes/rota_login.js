// IMPORTAÇÕES
    const express = require('express');
    const router = express.Router();
    const Usuario = require('../../Models/Usuarios');


router.get('/', (req,res)=>{
    // Salve a URL da página anterior como uma query string
    const redirectUrl = req.query.redirect || '/';
    console.log(redirectUrl)

    // Renderize a página de login, passando a URL da página anterior como um parâmetro
    res.render('login', { redirectUrl });
})


router.post('/eftuar_login', (req,res)=>{
    let usu = req.body.usuario;
    let senha = req.body.senha;
    Usuario.findAll({where:{USR_Usuario: usu}}).then((result)=>{
        
        if(result.length > 0){
            if(senha == result[0].USR_Senha){
                console.log(result[0].USR_Usuario);
                req.session.usuario = usu;
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




module.exports = router;