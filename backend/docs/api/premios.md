# API de Premios

## Descripción
Sistema de gestión de premios que pueden ser canjeados por los usuarios usando sus puntos acumulados.

## Endpoints

### Obtener Todos los Premios
- **URL**: `/api/premios`
- **Método**: `GET`
- **Autenticación**: Requerida
- **Respuesta Exitosa**:
  ```json
  {
    "premios": [
      {
        "id": "string",
        "nombre": "string",
        "descripcion": "string",
        "costo_puntos": "number",
        "stock": "number",
        "fecha_creacion": "date",
        "fecha_actualizacion": "date"
      }
    ]
  }
  ```

### Obtener Premio por ID
- **URL**: `/api/premios/:id`
- **Método**: `GET`
- **Autenticación**: Requerida
- **Parámetros URL**: 
  - `id`: ID del premio
- **Respuesta Exitosa**:
  ```json
  {
    "premio": {
      "id": "string",
      "nombre": "string",
      "descripcion": "string",
      "costo_puntos": "number",
      "stock": "number",
      "fecha_creacion": "date",
      "fecha_actualizacion": "date"
    }
  }
  ```
- **Respuesta Error (404)**:
  ```json
  {
    "msg": "Premio no encontrado"
  }
  ```

### Crear Premio
- **URL**: `/api/premios`
- **Método**: `POST`
- **Autenticación**: Requerida
- **Rol**: admin
- **Body**:
  ```json
  {
    "nombre": "string",
    "descripcion": "string",
    "costo_puntos": "number",
    "stock": "number"
  }
  ```
- **Respuesta Exitosa (201)**:
  ```json
  {
    "msg": "Premio creado exitosamente",
    "premio": {
      "id": "string",
      "nombre": "string",
      "descripcion": "string",
      "costo_puntos": "number",
      "stock": "number",
      "fecha_creacion": "date",
      "fecha_actualizacion": "date"
    }
  }
  ```
- **Validaciones**:
  - Nombre: Requerido
  - Descripción: Requerida
  - Costo Puntos: Número entero positivo
  - Stock: Número entero no negativo

### Actualizar Premio
- **URL**: `/api/premios/:id`
- **Método**: `PUT`
- **Autenticación**: Requerida
- **Rol**: admin
- **Parámetros URL**: 
  - `id`: ID del premio
- **Body** (todos los campos son opcionales):
  ```json
  {
    "nombre": "string",
    "descripcion": "string",
    "costo_puntos": "number",
    "stock": "number"
  }
  ```
- **Respuesta Exitosa**:
  ```json
  {
    "msg": "Premio actualizado exitosamente",
    "premio": {
      "id": "string",
      "nombre": "string",
      "descripcion": "string",
      "costo_puntos": "number",
      "stock": "number",
      "fecha_creacion": "date",
      "fecha_actualizacion": "date"
    }
  }
  ```

### Eliminar Premio
- **URL**: `/api/premios/:id`
- **Método**: `DELETE`
- **Autenticación**: Requerida
- **Rol**: admin
- **Parámetros URL**: 
  - `id`: ID del premio
- **Respuesta Exitosa**:
  ```json
  {
    "msg": "Premio eliminado exitosamente"
  }
  ```