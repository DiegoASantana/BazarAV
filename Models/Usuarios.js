const db = require('./db');

const Usuarios = db.sequelize.define('usuarios',{
    USR_IdUsuario:{
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    USR_Email:{
        type: db.Sequelize.STRING
    },
    USR_Senha:{
        type: db.Sequelize.STRING
    },
    USR_NomeCompleto:{
        type: db.Sequelize.STRING
    },
    USR_NumCelular:{
        type: db.Sequelize.INTEGER
    },
    USR_Endereço:{
        type: db.Sequelize.STRING
    },
    USR_Bairro:{
        type: db.Sequelize.STRING
    },
    USR_Cidade:{
        type: db.Sequelize.STRING
    },
    USR_CEP:{
        type: db.Sequelize.STRING
    }
},{
    timestamps: false
});

module.exports = Usuarios;