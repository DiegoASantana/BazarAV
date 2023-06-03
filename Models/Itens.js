const db = require('./db');

const Itens = db.sequelize.define('itens',{
    ITM_IdItem:{
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    ITM_CodReferencia:{
        type: db.Sequelize.STRING
    },
    ITM_Tipo:{
        type: db.Sequelize.STRING
    },
    ITM_Classificacao:{
        type: db.Sequelize.STRING
    },
    ITM_Sexo:{
        type: db.Sequelize.STRING
    },
    ITM_Item:{
        type: db.Sequelize.STRING
    },
    ITM_Marca:{
        type: db.Sequelize.STRING
    },
    ITM_Tamanho:{
        type: db.Sequelize.STRING
    },
    ITM_Descricao:{
        type: db.Sequelize.STRING
    },
    ITM_Quantidade:{
        type: db.Sequelize.INTEGER
    },
    ITM_Valor:{
        type: db.Sequelize.FLOAT
    },
    ITM_Foto:{
        type: db.Sequelize.STRING
    }
},{
    timestamps: false
});

module.exports = Itens;