const { sequelize } = require('../SQLmodels');
const Transferencia = require('../SQLmodels/Transferencia');
const Canje = require('../SQLmodels/Canje');
const Premio = require('../SQLmodels/Premio');
const Usuario = require('../SQLmodels/Usuario');
const Empleado = require('../SQLmodels/Empleado');
const Area = require('../SQLmodels/Area');

async function cleanDatabase() {
    try {
        console.log('Iniciando limpieza de la base de datos...');
        
        // Desactivar temporalmente las restricciones de clave foránea
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        
        // Limpiar todas las tablas
        await Promise.all([
            Transferencia.destroy({ where: {}, force: true }),
            Canje.destroy({ where: {}, force: true }),
            Premio.destroy({ where: {}, force: true }),
            Usuario.destroy({ where: {}, force: true }),
            Empleado.destroy({ where: {}, force: true }),
            Area.destroy({ where: {}, force: true })
        ]);
        
        // Reactivar las restricciones de clave foránea
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        
        // Reiniciar los auto-incrementos
        await Promise.all([
            sequelize.query('ALTER TABLE Transferencias AUTO_INCREMENT = 1'),
            sequelize.query('ALTER TABLE Canjes AUTO_INCREMENT = 1'),
            sequelize.query('ALTER TABLE Premios AUTO_INCREMENT = 1'),
            sequelize.query('ALTER TABLE Usuarios AUTO_INCREMENT = 1'),
            sequelize.query('ALTER TABLE Empleados AUTO_INCREMENT = 1'),
            sequelize.query('ALTER TABLE Areas AUTO_INCREMENT = 1')
        ]);

        console.log('Base de datos limpiada exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('Error al limpiar la base de datos:', error);
        process.exit(1);
    }
}

// Ejecutar la limpieza
cleanDatabase();
