# America Awards - Sistema de Recompensas

## Índice
1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Instalación y Configuración](#instalación-y-configuración)
4. [Funcionalidades](#funcionalidades)
5. [API Endpoints](#api-endpoints)
6. [Base de Datos](#base-de-datos)
7. [Errores Técnicos y Soluciones](#errores-técnicos-y-soluciones)
8. [Mantenimiento](#mantenimiento)

## Descripción General

America Awards es un sistema de recompensas interno que permite a los empleados acumular y canjear puntos por premios. El sistema está construido con una arquitectura moderna que separa el frontend (React) del backend (Node.js/Express) y utiliza MySQL como base de datos.

### Tecnologías Principales
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Base de Datos**: MySQL
- **ORM**: Sequelize
- **Autenticación**: JWT

## Estructura del Proyecto

```
america-awards/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuración de DB y variables de entorno
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── middleware/      # Middleware de autenticación y validación
│   │   ├── routes/         # Definición de rutas API
│   │   ├── SQLmodels/      # Modelos Sequelize
│   │   └── scripts/        # Scripts de utilidad (ej: inicialización DB)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── context/       # Contextos de React (ej: AuthContext)
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Páginas principales
│   │   └── services/     # Servicios API
│   └── package.json
└── docs/                 # Documentación
```

## Instalación y Configuración

### Requisitos Previos
- Node.js v14 o superior
- MySQL 8.0 o superior
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone [URL_DEL_REPOSITORIO]
\`\`\`

2. **Configurar el Backend**
\`\`\`bash
cd backend
npm install
\`\`\`

Crear archivo .env:
\`\`\`env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=america_apps_db
JWT_SECRET=tu_secret_key
\`\`\`

3. **Configurar el Frontend**
\`\`\`bash
cd frontend
npm install
\`\`\`

4. **Inicializar la Base de Datos**
\`\`\`bash
cd backend
node src/scripts/cleanDatabase.js
node src/scripts/initDatabase.js
\`\`\`

5. **Ejecutar el Proyecto**
\`\`\`bash
# Terminal 1 (Backend)
cd backend
npm run dev

# Terminal 2 (Frontend)
cd frontend
npm run dev
\`\`\`

## Funcionalidades

### 1. Sistema de Autenticación
- Login con email y contraseña
- Protección de rutas por rol (admin/usuario)
- Manejo de sesiones con JWT

### 2. Panel de Usuario
- **Vista de Saldo**: Muestra puntos disponibles
- **Transferencias**: Permite enviar puntos a otros usuarios
- **Canjes**: Permite canjear puntos por premios
- **Historial**: Muestra historial de transferencias y canjes

### 3. Panel de admin
- **Gestión de Usuarios**: CRUD de usuarios
- **Gestión de Premios**: CRUD de premios
- **Gestión de Áreas**: CRUD de áreas
- **Reportes**: Vista de transferencias y canjes
- **Aprobación de Canjes**: Gestión de solicitudes de canje

## API Endpoints

### Autenticación
- POST /api/auth/login
- POST /api/auth/register

### Usuarios
- GET /api/usuarios
- POST /api/usuarios
- PUT /api/usuarios/:id
- DELETE /api/usuarios/:id

### Transferencias
- POST /api/transferencias
- GET /api/transferencias
- GET /api/transferencias/mis-transferencias

### Canjes
- POST /api/canjes
- GET /api/canjes
- GET /api/canjes/mis-canjes
- PUT /api/canjes/:id/estado

### Premios
- GET /api/premios
- POST /api/premios
- PUT /api/premios/:id
- DELETE /api/premios/:id

## Base de Datos

### Estructura de Tablas

1. **Usuarios**
   - id (PK)
   - nombre
   - email
   - password
   - rol
   - empleado (FK)
   - saldo_puntos_canjeables

2. **Empleados**
   - idEmpleado (PK)
   - nombre
   - puesto
   - area (FK)

3. **Areas**
   - nombre (PK)

4. **Premios**
   - premio_id (PK)
   - nombre
   - descripcion
   - costo_puntos
   - stock
   - imagen_url

5. **Transferencias**
   - transferencia_id (PK)
   - emisor_id (FK)
   - receptor_id (FK)
   - cantidad
   - fecha
   - motivo

6. **Canjes**
   - canje_id (PK)
   - usuario_id (FK)
   - premio_id (FK)
   - fecha
   - estado
   - cantidad

## Errores Técnicos y Soluciones

### 1. Problemas con Claves Foráneas
**Problema**: Error al crear empleados debido a referencias incorrectas en la tabla de áreas.
**Solución**: Se modificó el modelo de Empleado para usar el nombre del área como clave foránea en lugar de ID.

### 2. Error en Transferencias
**Problema**: Error 500 al realizar transferencias debido a problemas de concurrencia.
**Solución**: Implementación de transacciones SQL para asegurar la atomicidad de las operaciones.

### 3. Problemas con Canjes
**Problema**: Los canjes no se mostraban en el historial del usuario.
**Solución**: Corrección de las relaciones en el modelo Canje y actualización de las consultas para incluir la información del premio.

### 4. Errores de Autenticación
**Problema**: Tokens JWT no se validaban correctamente.
**Solución**: Actualización del middleware de autenticación y corrección del manejo de tokens en el frontend.

## Mantenimiento

### Scripts de Utilidad

1. **Limpieza de Base de Datos**
\`\`\`bash
node src/scripts/cleanDatabase.js
\`\`\`

2. **Inicialización con Datos de Prueba**
\`\`\`bash
node src/scripts/initDatabase.js
\`\`\`

### Credenciales de Prueba
- **Admin**: admin@test.com / admin123
- **Usuario**: juan@test.com / user123
- **Usuario**: maria@test.com / user123

### Backup y Restauración
Se recomienda realizar backups periódicos de la base de datos:
\`\`\`bash
mysqldump -u [usuario] -p america_apps_db > backup.sql
\`\`\`
