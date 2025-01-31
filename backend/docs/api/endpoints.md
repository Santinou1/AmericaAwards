# Endpoints de la API

## Autenticación

### Login
- **URL**: `/api/auth`
- **Método**: `POST`
- **Body**:
  ```json
  {
    "email": "usuario@email.com",
    "password": "password123"
  }
  ```

### Obtener Usuario Autenticado
- **URL**: `/api/auth`
- **Método**: `GET`
- **Header**: `x-auth-token`

## Usuarios

### Crear Primer Administrador
- **URL**: `/api/usuarios/primer-admin`
- **Método**: `POST`
- **Acceso**: Público (solo funciona una vez)

### Gestión de Usuarios
- **Base URL**: `/api/usuarios`
- **Headers**: `x-auth-token`

| Método | Ruta | Acceso | Descripción |
|--------|------|---------|-------------|
| GET | / | Admin | Listar usuarios |
| GET | /:id | Admin/Usuario | Ver usuario |
| POST | / | Admin | Crear usuario |
| PUT | /:id | Admin/Usuario | Actualizar usuario |
| DELETE | /:id | Admin | Eliminar usuario |

## Transferencias

### Gestión de Transferencias
- **Base URL**: `/api/transferencias`
- **Headers**: `x-auth-token`

| Método | Ruta | Acceso | Descripción |
|--------|------|---------|-------------|
| POST | / | Usuario | Realizar transferencia |
| GET | /mis-transferencias | Usuario | Ver transferencias propias |
| GET | / | Admin | Ver todas las transferencias |

[Ver ejemplos completos en requests.http](../requests.http)