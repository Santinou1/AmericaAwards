# API de Usuarios

## Endpoints

### Obtener Todos los Usuarios
- **URL**: `/api/usuarios`
- **Método**: `GET`
- **Respuesta Exitosa**:
  ```json
  [
    {
      "id": "string",
      "nombre": "string",
      "email": "string",
      "rol": "empleado|administrador",
      "saldo_puntos_canjeables": "number",
      "saldo_puntos_transferibles": "number",
      "fecha_creacion": "date",
      "fecha_actualizacion": "date"
    }
  ]
  ```

### Obtener Usuario por ID
- **URL**: `/api/usuarios/:id`
- **Método**: `GET`
- **Parámetros URL**: 
  - `id`: ID del usuario
- **Respuesta Exitosa**:
  ```json
  {
    "id": "string",
    "nombre": "string",
    "email": "string",
    "rol": "empleado|administrador",
    "saldo_puntos_canjeables": "number",
    "saldo_puntos_transferibles": "number",
    "fecha_creacion": "date",
    "fecha_actualizacion": "date"
  }
  ```
- **Respuesta Error (404)**:
  ```json
  {
    "msg": "Usuario no encontrado"
  }
  ```

### Crear Usuario
- **URL**: `/api/usuarios`
- **Método**: `POST`
- **Body**:
  ```json
  {
    "nombre": "string",
    "email": "string",
    "password": "string",
    "rol": "empleado|administrador" (opcional),
    "saldo_puntos_canjeables": "number" (opcional),
    "saldo_puntos_transferibles": "number" (opcional)
  }
  ```
- **Respuesta Exitosa (201)**:
  ```json
  {
    "msg": "Usuario creado exitosamente",
    "usuario": {
      "id": "string",
      "nombre": "string",
      "email": "string",
      "rol": "string",
      "saldo_puntos_canjeables": "number",
      "saldo_puntos_transferibles": "number",
      "fecha_creacion": "date",
      "fecha_actualizacion": "date"
    }
  }
  ```
- **Validaciones**:
  - Nombre: Requerido
  - Email: Debe ser válido y único
  - Password: Mínimo 6 caracteres, debe contener al menos un número
  - Rol: Debe ser 'empleado' o 'administrador'
  - Saldos: Deben ser números positivos

### Actualizar Usuario
- **URL**: `/api/usuarios/:id`
- **Método**: `PUT`
- **Parámetros URL**: 
  - `id`: ID del usuario
- **Body** (todos los campos son opcionales):
  ```json
  {
    "nombre": "string",
    "email": "string",
    "password": "string",
    "rol": "empleado|administrador",
    "saldo_puntos_canjeables": "number",
    "saldo_puntos_transferibles": "number"
  }
  ```
- **Respuesta Exitosa**:
  ```json
  {
    "msg": "Usuario actualizado exitosamente",
    "usuario": {
      "id": "string",
      "nombre": "string",
      "email": "string",
      "rol": "string",
      "saldo_puntos_canjeables": "number",
      "saldo_puntos_transferibles": "number",
      "fecha_creacion": "date",
      "fecha_actualizacion": "date"
    }
  }
  ```
- **Validaciones**:
  - Email: Debe ser válido y único si se actualiza
  - Password: Mínimo 6 caracteres, debe contener al menos un número si se actualiza
  - Rol: Debe ser 'empleado' o 'administrador' si se actualiza
  - Saldos: Deben ser números positivos si se actualizan

### Eliminar Usuario
- **URL**: `/api/usuarios/:id`
- **Método**: `DELETE`
- **Parámetros URL**: 
  - `id`: ID del usuario
- **Respuesta Exitosa**:
  ```json
  {
    "msg": "Usuario eliminado exitosamente"
  }
  ```
- **Respuesta Error (404)**:
  ```json
  {
    "msg": "Usuario no encontrado"
  }
  ```