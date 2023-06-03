// IMPORTAÇÕES
    const express = require('express');
    const router = express.Router();
    const Usuario = require('../../Models/Usuarios');
    const session = require('express-session');

    router.use(session({
        secret: 'teste diego',
        resave: false,
        saveUninitialized: true
    }));

router.get('/', (req,res)=>{
    res.render('login');
})


router.post('/eftuar_login', (req,res)=>{
    let usu = req.body.usuario;
    let senha = req.body.senha;
    Usuario.findAll({where:{USR_Usuario: usu}}).then((result)=>{
        console.log(result);
        if(result.length > 0){
            if(senha == result[0].USR_Senha){
                req.session.usuario = usu;
                req.session.save(function(err){
                    if(err){
                        console.error('erro ao salvar usuario', err)
                    }else{
                        console.log('usuário salvo na sessão:', req.session.usuario)
                    }
                });
                res.render('login')
            }else{
                console.log("Senha no banco: " +result[0].USR_Senha + " \nNão confere com senha colocada: " +senha);
                return res.send({error: 'Senha não confere'});
            } 
        }else{
            return res.send({error: "Usuário não Cadastrado"})
         }
    })
})



module.exports = router;