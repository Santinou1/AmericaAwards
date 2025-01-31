# API de Canjes

## Descripción
Sistema de canje de premios que permite a los usuarios intercambiar sus puntos por recompensas del catálogo.

## Endpoints

### Realizar Canje
- **URL**: `/api/canjes`
- **Método**: `POST`
- **Autenticación**: Requerida
- **Body**:
  ```json
  {
    "premio_id": "string",
    "cantidad": "number"
  }
  ```
- **Respuesta Exitosa (201)**:
  ```json
  {
    "msg": "Canje realizado con éxito",
    "canje": {
      "id": "string",
      "usuario_id": "string",
      "premio_id": {
        "id": "string",
        "nombre": "string",
        "descripcion": "string",
        "costo_puntos": "number"
      },
      "cantidad": "number",
      "fecha": "date",
      "estado": "string"
    }
  }
  ```
- **Validaciones**:
  - Premio debe existir
  - Stock debe ser suficiente
  - Usuario debe tener saldo suficiente
  - Cantidad debe ser positiva

### Obtener Mis Canjes
- **URL**: `/api/canjes/mis-canjes`
- **Método**: `GET`
- **Autenticación**: Requerida
- **Respuesta**:
  ```json
  {
    "canjes": [
      {
        "id": "string",
        "premio_id": {
          "id": "string",
          "nombre": "string",
          "descripcion": "string",
          "costo_puntos": "number"
        },
        "cantidad": "number",
        "fecha": "date",
        "estado": "string"
      }
    ]
  }
  ```

### Obtener Todos los Canjes (Admin)
- **URL**: `/api/canjes`
- **Método**: `GET`
- **Autenticación**: Requerida
- **Rol**: Administrador
- **Respuesta**:
  ```json
  {
    "canjes": [
      {
        "id": "string",
        "usuario_id": {
          "id": "string",
          "nombre": "string",
          "email": "string"
        },
        "premio_id": {
          "id": "string",
          "nombre": "string",
          "descripcion": "string",
          "costo_puntos": "number"
        },
        "cantidad": "number",
        "fecha": "date",
        "estado": "string"
      }
    ]
  }
  ```

## Manejo de Errores

### Errores Comunes
- **400**: Validación fallida
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
- **400**: Saldo insuficiente
  ```json
  {
    "msg": "Saldo insuficiente para realizar el canje"
  }
  ```
- **400**: Stock insuficiente
  ```json
  {
    "msg": "Stock insuficiente"
  }
  ```
- **404**: Premio no encontrado
  ```json
  {
    "msg": "Premio no encontrado"
  }
  ```