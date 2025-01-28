# API Documentation

## Estructura del Proyecto

La API está estructurada de la siguiente manera:

```
proyecto/
├── src/
│   ├── controllers/     # Controladores que manejan la lógica de negocio
│   ├── models/         # Modelos de Mongoose para la base de datos
│   ├── routes/         # Rutas de la API
│   ├── middleware/     # Middlewares personalizados
│   ├── config/         # Configuraciones (DB, variables de entorno, etc.)
│   └── server.js       # Archivo principal del servidor
├── package.json
└── .env               # Variables de entorno (no versionado)
```

### Descripción de Carpetas

- **controllers/**: Contendrá la lógica de negocio de la aplicación, separando las responsabilidades por entidad.
- **models/**: Contiene los modelos de Mongoose que definen la estructura de los datos.
- **routes/**: Definirá las rutas de la API y conectará las rutas con sus respectivos controladores.
- **middleware/**: Contendrá funciones de middleware como autenticación, validación, etc.
- **config/**: Archivos de configuración para la base de datos y otras configuraciones globales.

## Modelos de Base de Datos

### Usuario (`Usuario.js`)
Gestiona la información de los usuarios del sistema.

```javascript
Campos:
- nombre: String (requerido)
- email: String (requerido, único)
- password: String (requerido)
- rol: String (enum: ['empleado', 'administrador'])
- saldo_puntos_canjeables: Number (default: 0)
- saldo_puntos_transferibles: Number (default: 0)
- timestamps: fecha_creacion, fecha_actualizacion
```

### Transferencia (`Transferencia.js`)
Registra las transferencias de puntos entre usuarios.

```javascript
Campos:
- emisor_id: ObjectId (referencia a Usuario)
- receptor_id: ObjectId (referencia a Usuario)
- puntos: Number (requerido)
- mensaje: String
- fecha: Date (default: Date.now)
```

### Premio (`Premio.js`)
Gestiona el catálogo de premios disponibles.

```javascript
Campos:
- nombre: String (requerido)
- descripcion: String (requerido)
- costo_puntos: Number (requerido)
- stock: Number (requerido, mínimo 0)
- timestamps: fecha_creacion, fecha_actualizacion
```

### Canje (`Canje.js`)
Registra las solicitudes de canje de premios.

```javascript
Campos:
- usuario_id: ObjectId (referencia a Usuario)
- premio_id: ObjectId (referencia a Premio)
- cantidad: Number (requerido, mínimo 1)
- fecha: Date (default: Date.now)
- estado: String (enum: ['pendiente', 'aprobado', 'rechazado'])
```

## Endpoints de la API

### Usuarios

#### Crear Usuario
- **URL**: `/api/usuarios`
- **Método**: `POST`
- **Body**:
  ```json
  {
    "nombre": "string",
    "email": "string",
    "password": "string",
    "rol": "empleado|administrador" (opcional)
  }
  ```
- **Respuesta Exitosa**:
  ```json
  {
    "msg": "Usuario creado exitosamente",
    "usuario": {
      "id": "string",
      "nombre": "string",
      "email": "string",
      "rol": "string",
      "saldo_puntos_canjeables": 0,
      "saldo_puntos_transferibles": 0
    }
  }
  ```
- **Validaciones**:
  - Nombre: Requerido
  - Email: Debe ser válido y único
  - Password: Mínimo 6 caracteres, debe contener al menos un número
  - Rol: Debe ser 'empleado' o 'administrador'

## Relaciones entre Modelos

- Los usuarios están relacionados con las transferencias tanto como emisores como receptores
- Los usuarios se relacionan con los canjes como solicitantes
- Los premios están relacionados con los canjes como items solicitados

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución
- **Express**: Framework web
- **MongoDB**: Base de datos
- **Mongoose**: ODM para MongoDB
- **Cors**: Middleware para habilitar CORS
- **Dotenv**: Manejo de variables de entorno
- **bcryptjs**: Encriptación de contraseñas
- **express-validator**: Validación de datos de entrada