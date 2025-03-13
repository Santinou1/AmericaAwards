# Modelos de Base de Datos

## Usuario
Gestiona la información de los usuarios del sistema.

### Esquema
```javascript
{
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['empleado', 'admin'],
    default: 'empleado'
  },
  saldo_puntos_canjeables: {
    type: Number,
    default: 0
  },
  saldo_puntos_transferibles: {
    type: Number,
    default: 0
  },
  timestamps: {
    fecha_creacion: Date,
    fecha_actualizacion: Date
  }
}
```

### Validaciones
- **nombre**: Campo requerido
- **email**: 
  - Campo requerido
  - Debe ser único
  - Se almacena en minúsculas
- **password**: Campo requerido, se almacena encriptado
- **rol**: Solo puede ser 'empleado' o 'admin'
- **saldos**: No pueden ser negativos

## Transferencia
Registra las transferencias de puntos entre usuarios.

### Esquema
```javascript
{
  emisor_id: {
    type: ObjectId,
    ref: 'Usuario',
    required: true
  },
  receptor_id: {
    type: ObjectId,
    ref: 'Usuario',
    required: true
  },
  puntos: {
    type: Number,
    required: true
  },
  mensaje: String,
  fecha: {
    type: Date,
    default: Date.now
  }
}
```

## Premio
Gestiona el catálogo de premios disponibles.

### Esquema
```javascript
{
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  costo_puntos: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  timestamps: {
    fecha_creacion: Date,
    fecha_actualizacion: Date
  }
}
```

## Canje
Registra las solicitudes de canje de premios.

### Esquema
```javascript
{
  usuario_id: {
    type: ObjectId,
    ref: 'Usuario',
    required: true
  },
  premio_id: {
    type: ObjectId,
    ref: 'Premio',
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['pendiente', 'aprobado', 'rechazado'],
    default: 'pendiente'
  }
}
```

### Validaciones
- **usuario_id**: Referencia válida a un usuario existente
- **premio_id**: Referencia válida a un premio existente
- **cantidad**: Número entero positivo
- **estado**: Solo puede ser 'pendiente', 'aprobado' o 'rechazado'