# API Documentation - America Awards

## Autenticación

### Login
```http
POST /api/auth/login
```

**Request Body**
```json
{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
}
```

**Response**
```json
{
    "token": "jwt_token_here",
    "usuario": {
        "id": 1,
        "nombre": "Nombre Usuario",
        "email": "usuario@ejemplo.com",
        "rol": "usuario",
        "saldo_puntos_canjeables": 1000
    }
}
```

## Transferencias

### Realizar Transferencia
```http
POST /api/transferencias
```

**Request Body**
```json
{
    "receptor_id": 2,
    "cantidad": 100,
    "motivo": "Ayuda en proyecto"
}
```

**Response**
```json
{
    "msg": "Transferencia realizada con éxito",
    "transferencia": {
        "transferencia_id": 1,
        "emisor_id": 1,
        "receptor_id": 2,
        "cantidad": 100,
        "motivo": "Ayuda en proyecto",
        "fecha": "2024-02-21T15:00:00.000Z"
    }
}
```

### Obtener Mis Transferencias
```http
GET /api/transferencias/mis-transferencias
```

**Response**
```json
{
    "transferencias": [
        {
            "transferencia_id": 1,
            "emisor": {
                "nombre": "Usuario Emisor",
                "email": "emisor@test.com"
            },
            "receptor": {
                "nombre": "Usuario Receptor",
                "email": "receptor@test.com"
            },
            "cantidad": 100,
            "motivo": "Ayuda en proyecto",
            "fecha": "2024-02-21T15:00:00.000Z"
        }
    ]
}
```

## Canjes

### Realizar Canje
```http
POST /api/canjes
```

**Request Body**
```json
{
    "premio_id": 1,
    "cantidad": 1
}
```

**Response**
```json
{
    "msg": "Canje realizado con éxito",
    "canje": {
        "canje_id": 1,
        "usuario_id": 1,
        "premio_id": 1,
        "cantidad": 1,
        "estado": "pendiente",
        "fecha": "2024-02-21T15:00:00.000Z"
    }
}
```

### Obtener Mis Canjes
```http
GET /api/canjes/mis-canjes
```

**Response**
```json
{
    "canjes": [
        {
            "canje_id": 1,
            "Premio": {
                "nombre": "Día Libre",
                "descripcion": "Un día libre para disfrutar",
                "costo_puntos": 100
            },
            "cantidad": 1,
            "estado": "pendiente",
            "fecha": "2024-02-21T15:00:00.000Z"
        }
    ]
}
```

### Actualizar Estado de Canje (Admin)
```http
PUT /api/canjes/:id/estado
```

**Request Body**
```json
{
    "estado": "aprobado"
}
```

**Response**
```json
{
    "msg": "Estado del canje actualizado",
    "canje": {
        "canje_id": 1,
        "estado": "aprobado"
    }
}
```

## Premios

### Crear Premio (Admin)
```http
POST /api/premios
```

**Request Body**
```json
{
    "nombre": "Nuevo Premio",
    "descripcion": "Descripción del premio",
    "costo_puntos": 200,
    "stock": 10,
    "imagen_url": "https://ejemplo.com/imagen.jpg"
}
```

### Obtener Premios
```http
GET /api/premios
```

**Response**
```json
{
    "premios": [
        {
            "premio_id": 1,
            "nombre": "Día Libre",
            "descripcion": "Un día libre para disfrutar",
            "costo_puntos": 100,
            "stock": 10,
            "imagen_url": "https://ejemplo.com/dia-libre.jpg"
        }
    ]
}
```

## Códigos de Error

- **400**: Bad Request - Error en los datos enviados
- **401**: Unauthorized - Token no válido o expirado
- **403**: Forbidden - No tiene permisos para esta acción
- **404**: Not Found - Recurso no encontrado
- **500**: Internal Server Error - Error en el servidor

## Headers Requeridos

Para endpoints protegidos:
```http
Authorization: Bearer <token>
```

Para todas las peticiones:
```http
Content-Type: application/json
```
