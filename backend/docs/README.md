# Sistema de Gamificación Laboral

## Descripción General

Sistema de gamificación que permite el reconocimiento entre compañeros a través de puntos y recompensas, fomentando un ambiente laboral positivo y colaborativo.

## Estructura del Proyecto

```
proyecto/
├── src/
│   ├── controllers/     # Controladores que manejan la lógica de negocio
│   │   ├── authController.js
│   │   ├── canjeController.js
│   │   ├── premioController.js
│   │   ├── transferenciaController.js
│   │   └── usuarioController.js
│   ├── models/         # Modelos de Mongoose para la base de datos
│   │   ├── Canje.js
│   │   ├── Premio.js
│   │   ├── Transferencia.js
│   │   └── Usuario.js
│   ├── routes/         # Rutas de la API
│   │   ├── authRoutes.js
│   │   ├── canjeRoutes.js
│   │   ├── premioRoutes.js
│   │   ├── transferenciaRoutes.js
│   │   └── usuarioRoutes.js
│   ├── middleware/     # Middlewares personalizados
│   │   ├── auth.js
│   │   ├── checkRole.js
│   │   └── validacion.js
│   ├── config/        # Configuraciones (DB, variables de entorno, etc.)
│   │   └── db.js
│   └── server.js      # Archivo principal del servidor
├── docs/             # Documentación del proyecto
│   ├── api/          # Documentación de endpoints
│   │   ├── auth.md
│   │   ├── canjes.md
│   │   ├── premios.md
│   │   ├── transferencias.md
│   │   └── usuarios.md
│   └── *.md          # Otros archivos de documentación
├── package.json
└── .env             # Variables de entorno (no versionado)
```

## Documentación

### Backend (API)
- [Endpoints y Rutas](./api/endpoints.md)
- [Modelos de Datos](./api/models.md)
- [Autenticación y Seguridad](./api/auth.md)
- [Sistema de Transferencias](./api/transferencias.md)
- [Sistema de Premios](./api/premios.md)
- [Sistema de Canjes](./api/canjes.md)

### Frontend
- [Guía de Implementación](./front/README.md)
- [Autenticación](./front/auth.md)
- [Componentes](./front/components.md)

## Inicio Rápido

1. [Configuración del Proyecto](./setup.md)
2. [Primeros Pasos](./getting-started.md)
3. [Guía de Contribución](./contributing.md)

## Características Principales

### 1. Gestión de Usuarios
- Registro y autenticación
- Roles (administrador y empleado)
- Gestión de saldos de puntos

### 2. Sistema de Transferencias
- Transferencia de puntos entre usuarios
- Historial de transferencias
- Mensajes personalizados

### 3. Catálogo de Premios
- Gestión de premios disponibles
- Control de stock
- Diferentes categorías y costos

### 4. Sistema de Canjes
- Canje de puntos por premios
- Verificación de saldo y stock
- Historial de canjes
- Estado de solicitudes

## Roles y Permisos

### Administrador
- Gestión completa de usuarios
- Gestión del catálogo de premios
- Acceso a todos los historiales
- Aprobación de canjes (opcional)

### Usuario
- Ver y actualizar su información
- Realizar transferencias
- Canjear premios
- Ver su historial personal