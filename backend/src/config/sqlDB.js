const { Sequelize} = require('sequelize')

const sequelize = new Sequelize('america_apps_db', 'root','',{
    host: 'localhost',
    dialect: 'mysql',
    logging: true,
});

(async () =>{
    try{
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente');
    }catch(error){
        console.error('No se pudo conectar a la base de datos:', error);
    }
})();

module.exports = sequelize;