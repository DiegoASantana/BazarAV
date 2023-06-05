const db = require('./db');

const ItensFavoritos = db.Sequelize('itensfavoritosxusuarios',{
    IFU_ItemFavoritoxUsuario:{
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    IFU_Item:{
        type: db.Sequelize.INTEGER
    },
    IFU_IdUsuario:{
        type: db.Sequelize.INTEGER
    }
},{
    timestamp: false
});

module.exports = ItensFavoritos;