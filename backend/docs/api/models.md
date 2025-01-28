# Modelos de Datos

## Usuario

```javascript
{
  nombre: String,          // Requerido
  email: String,          // Requerido, Único
  password: String,       // Requerido, Encriptado
  rol: String,           // 'empleado' | 'administrador'
  saldo_puntos_canjeables: Number,
  saldo_puntos_transferibles: Number,
  timestamps: {
    fecha_creacion: Date,
    fecha_actualizacion: Date
  }
}
```

## Transferencia

```javascript
{
  emisor_id: ObjectId,    // Ref: Usuario
  receptor_id: ObjectId,  // Ref: Usuario
  puntos: Number,        // Requerido
  mensaje: String,
  fecha: Date
}
```

## Premio

```javascript
{
  nombre: String,        // Requerido
  descripcion: String,   // Requerido
  costo_puntos: Number,  // Requerido
  stock: Number,         // Requerido, Min: 0
  timestamps: {
    fecha_creacion: Date,
    fecha_actualizacion: Date
  }
}
```

## Canje

```javascript
{
  usuario_id: ObjectId,  // Ref: Usuario
  premio_id: ObjectId,   // Ref: Premio
  cantidad: Number,      // Requerido, Min: 1
  fecha: Date,
  estado: String        // 'pendiente' | 'aprobado' | 'rechazado'
}
```