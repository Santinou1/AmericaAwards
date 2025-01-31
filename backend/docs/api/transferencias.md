# API de Transferencias

## Descripción
Sistema de transferencia de puntos entre usuarios que permite el reconocimiento entre compañeros.

## Endpoints

### Realizar Transferencia
- **URL**: `/api/transferencias`
- **Método**: `POST`
- **Autenticación**: Requerida
- **Body**:
  ```json
  {
    "receptor_id": "string",
    "puntos": "number",
    "mensaje": "string" (opcional)
  }
  ```
- **Respuesta Exitosa**:
  ```json
  {
    "msg": "Transferencia realizada con éxito",
    "transferencia": {
      "emisor_id": "string",
      "receptor_id": "string",
      "puntos": "number",
      "mensaje": "string",
      "fecha": "date"
    }
  }
  ```
- **Validaciones**:
  - No se puede transferir a uno mismo
  - El emisor debe tener saldo suficiente
  - Los puntos deben ser positivos
  - El receptor debe existir

### Obtener Mis Transferencias
- **URL**: `/api/transferencias/mis-transferencias`
- **Método**: `GET`
- **Autenticación**: Requerida
- **Respuesta**:
  ```json
  {
    "transferencias": [
      {
        "emisor_id": {
          "id": "string",
          "nombre": "string",
          "email": "string"
        },
        "receptor_id": {
          "id": "string",
          "nombre": "string",
          "email": "string"
        },
        "puntos": "number",
        "mensaje": "string",
        "fecha": "date"
      }
    ]
  }
  ```

### Obtener Todas las Transferencias
- **URL**: `/api/transferencias`
- **Método**: `GET`
- **Autenticación**: Requerida
- **Rol**: Administrador
- **Respuesta**: Similar a "Mis Transferencias" pero incluye todas las transferencias del sistema

## Manejo de Errores

### Errores Comunes
- **400**: Validación fallida (datos incorrectos)
  ```json
  {
    "errores": [
      {
        "msg": "Descripción del error",
        "param": "campo_con_error"
      }
    ]
  }
  ```
- **401**: No autenticado
- **403**: No autorizado (para acciones de admin)
- **500**: Error del servidor