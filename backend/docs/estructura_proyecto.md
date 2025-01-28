# Estructura del Proyecto

## Organización de Carpetas

```
proyecto/
├── src/
│   ├── controllers/     # Controladores que manejan la lógica de negocio
│   ├── models/         # Modelos de Mongoose para la base de datos
│   ├── routes/         # Rutas de la API
│   ├── middleware/     # Middlewares personalizados
│   ├── config/        # Configuraciones (DB, variables de entorno, etc.)
│   └── server.js      # Archivo principal del servidor
├── docs/             # Documentación del proyecto
│   ├── api/          # Documentación de endpoints
│   └── *.md          # Otros archivos de documentación
├── package.json
└── .env             # Variables de entorno (no versionado)
```

## Descripción de Carpetas

### `src/`
- **controllers/**: Contiene la lógica de negocio de la aplicación
  - Separación por entidad (usuarios, transferencias, premios, canjes)
  - Manejo de solicitudes y respuestas
  - Implementación de reglas de negocio

- **models/**: Define los esquemas de la base de datos
  - Modelos de Mongoose
  - Validaciones a nivel de esquema
  - Middleware de modelos

- **routes/**: Define las rutas de la API
  - Agrupación de endpoints por entidad
  - Conexión con controladores
  - Aplicación de middleware de validación

- **middleware/**: Funciones de procesamiento intermedio
  - Validación de datos
  - Autenticación y autorización
  - Manejo de errores

- **config/**: Archivos de configuración
  - Conexión a base de datos
  - Variables de entorno
  - Configuraciones globales

### `docs/`
- **api/**: Documentación detallada de endpoints
  - Especificaciones de rutas
  - Formatos de solicitud y respuesta
  - Ejemplos de uso

## Tecnologías Principales

- **Node.js**: Entorno de ejecución
- **Express**: Framework web
- **MongoDB**: Base de datos
- **Mongoose**: ODM para MongoDB
- **bcryptjs**: Encriptación de contraseñas
- **express-validator**: Validación de datos
- **cors**: Middleware para CORS
- **dotenv**: Manejo de variables de entorno