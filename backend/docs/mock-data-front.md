# Mock Data para la Base de Datos

## Tabla: `usuarios`
```json
[
  {
    "id": "1e8f5d4a-1234-4abc-8cde-5678ef90abcd",
    "nombre": "Juan Pérez",
    "email": "juan.perez@example.com",
    "password": "hashed_password_123",
    "rol": "empleado",
    "saldo_puntos_canjeables": 1000,
    "saldo_puntos_transferibles": 500,
    "fecha_creacion": "2025-01-01T10:00:00Z",
    "fecha_actualizacion": "2025-01-15T12:00:00Z"
  },
  {
    "id": "2b9f6d5b-5678-4def-9abc-1234ef90abcd",
    "nombre": "María López",
    "email": "maria.lopez@example.com",
    "password": "hashed_password_456",
    "rol": "administrador",
    "saldo_puntos_canjeables": 2000,
    "saldo_puntos_transferibles": 1000,
    "fecha_creacion": "2025-01-02T11:00:00Z",
    "fecha_actualizacion": "2025-01-16T13:00:00Z"
  }
]
```

## Tabla: `transferencias`
```json
[
  {
    "id": "3c8f7e6c-8901-4ghi-2jkl-3456mn78opqr",
    "emisor_id": "1e8f5d4a-1234-4abc-8cde-5678ef90abcd",
    "receptor_id": "2b9f6d5b-5678-4def-9abc-1234ef90abcd",
    "puntos": 200,
    "mensaje": "Buen trabajo en el proyecto",
    "fecha": "2025-01-10T14:00:00Z"
  }
]
```

## Tabla: `premios`
```json
[
  {
    "id": "4d9f8f7d-1234-5jkl-3mno-4567pq89qrst",
    "nombre": "Cafetera",
    "descripcion": "Cafetera de alta gama para espresso y café americano.",
    "costo_puntos": 1500,
    "stock": 10,
    "fecha_creacion": "2025-01-05T09:00:00Z",
    "fecha_actualizacion": "2025-01-17T10:00:00Z"
  },
  {
    "id": "5e0f9g8e-2345-6mno-4pqr-5678rs90tuvw",
    "nombre": "Auriculares Bluetooth",
    "descripcion": "Auriculares inalámbricos con cancelación de ruido.",
    "costo_puntos": 1000,
    "stock": 20,
    "fecha_creacion": "2025-01-06T10:00:00Z",
    "fecha_actualizacion": "2025-01-18T11:00:00Z"
  }
]
```

## Tabla: `canjes`
```json
[
  {
    "id": "6f1g0h9f-3456-7pqr-5stu-6789tu90vwxy",
    "usuario_id": "1e8f5d4a-1234-4abc-8cde-5678ef90abcd",
    "premio_id": "4d9f8f7d-1234-5jkl-3mno-4567pq89qrst",
    "cantidad": 1,
    "fecha": "2025-01-15T16:00:00Z",
    "estado": "aprobado"
  },
  {
    "id": "7g2h1i0g-4567-8stu-6vwx-7890uv12xyza",
    "usuario_id": "2b9f6d5b-5678-4def-9abc-1234ef90abcd",
    "premio_id": "5e0f9g8e-2345-6mno-4pqr-5678rs90tuvw",
    "cantidad": 2,
    "fecha": "2025-01-16T17:00:00Z",
    "estado": "pendiente"
  }
]
```

