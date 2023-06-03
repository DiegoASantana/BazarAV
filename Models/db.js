const Sequelize = require('sequelize');

const sequelize = new Sequelize('db_bazar','root','151819',{
    host: "localhost",
    dialect: 'mysql',
    query: {raw:true}
    });

    sequelize.authenticate()
    .then(()=>{
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.log('Não foi possível conectar ao banco de dados:', err);
    });

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
}