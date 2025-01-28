# Primeros Pasos

## 1. Crear Primer Administrador

```http
POST /api/usuarios/primer-admin
Content-Type: application/json

{
    "nombre": "Admin Principal",
    "email": "admin@empresa.com",
    "password": "admin123456"
}
```

## 2. Iniciar Sesión

```http
POST /api/auth
Content-Type: application/json

{
    "email": "admin@empresa.com",
    "password": "admin123456"
}
```

## 3. Flujo de Trabajo

1. El administrador crea usuarios
2. Los usuarios pueden:
   - Transferir puntos
   - Canjear premios
   - Ver su historial
3. El administrador gestiona:
   - Usuarios
   - Catálogo de premios
   - Reportes