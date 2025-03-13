const bcrypt = require('bcryptjs');
const { sequelize } = require('../SQLmodels');
const Area = require('../SQLmodels/Area');
const Empleado = require('../SQLmodels/Empleado');
const Usuario = require('../SQLmodels/Usuario');
const Premio = require('../SQLmodels/Premio');

async function initDatabase() {
    try {
        console.log('Iniciando inicialización de la base de datos...');

        // Crear áreas
        const areasData = [
            { nombre: 'Recursos Humanos' },
            { nombre: 'Tecnología' },
            { nombre: 'Marketing' },
            { nombre: 'Ventas' }
        ];

        for (const areaData of areasData) {
            await Area.create(areaData);
        }
        console.log('Áreas creadas');

        // Crear empleados
        const empleadosData = [
            { nombre: 'Admin', apellido: 'Sistema', area: 'Tecnología', puesto: 'admin' },
            { nombre: 'Juan', apellido: 'Pérez', area: 'Tecnología', puesto: 'Desarrollador' },
            { nombre: 'María', apellido: 'García', area: 'Marketing', puesto: 'Marketing Manager' },
            { nombre: 'Carlos', apellido: 'López', area: 'Ventas', puesto: 'Vendedor' }
        ];

        for (const empleadoData of empleadosData) {
            await Empleado.create(empleadoData);
        }
        console.log('Empleados creados');

        // Crear usuarios
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', salt);
        const userPassword = await bcrypt.hash('user123', salt);

        const usuariosData = [
            {
                nombre: 'admin',
                email: 'admin@test.com',
                password: adminPassword,
                rol: 'admin',
                empleado: 1,
                saldo_puntos_canjeables: 1000
            },
            {
                nombre: 'Juan Pérez',
                email: 'juan@test.com',
                password: userPassword,
                rol: 'usuario',
                empleado: 2,
                saldo_puntos_canjeables: 500
            },
            {
                nombre: 'María García',
                email: 'maria@test.com',
                password: userPassword,
                rol: 'usuario',
                empleado: 3,
                saldo_puntos_canjeables: 300
            }
        ];

        for (const usuarioData of usuariosData) {
            await Usuario.create(usuarioData);
        }
        console.log('Usuarios creados');

        // Crear premios
        const premiosData = [
            {
                nombre: 'Día Libre',
                descripcion: 'Un día libre para disfrutar como quieras',
                costo_puntos: 100,
                stock: 10,
                imagen_url: 'https://example.com/dia-libre.jpg'
            },
            {
                nombre: 'Vale de Almuerzo',
                descripcion: 'Vale para un almuerzo en restaurantes seleccionados',
                costo_puntos: 50,
                stock: 20,
                imagen_url: 'https://example.com/almuerzo.jpg'
            },
            {
                nombre: 'Curso Online',
                descripcion: 'Acceso a un curso online de tu elección',
                costo_puntos: 200,
                stock: 5,
                imagen_url: 'https://example.com/curso.jpg'
            }
        ];

        for (const premioData of premiosData) {
            await Premio.create(premioData);
        }
        console.log('Premios creados');

        console.log('Base de datos inicializada exitosamente');
        console.log('Credenciales de prueba:');
        console.log('Admin - Email: admin@test.com, Password: admin123');
        console.log('Usuario - Email: juan@test.com, Password: user123');
        console.log('Usuario - Email: maria@test.com, Password: user123');
        
        process.exit(0);
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        process.exit(1);
    }
}

// Ejecutar la inicialización
initDatabase();
