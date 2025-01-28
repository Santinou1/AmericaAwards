# Autenticación y Seguridad

## JWT (JSON Web Tokens)

- Token válido por 8 horas
- Se envía en header `x-auth-token`
- Contiene información del usuario (id, rol)

## Roles y Permisos

### Administrador
- Gestión completa de usuarios
- Gestión del catálogo de premios
- Acceso a reportes y estadísticas

### Usuario
- Ver/actualizar su información
- Transferir puntos
- Canjear premios
- Ver historial personal

## Middleware de Autenticación

```javascript
// Verificar token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'Token requerido' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.usuario;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};
```

## Middleware de Roles

```javascript
// Verificar admin
const isAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'administrador') {
    return res.status(403).json({ msg: 'Acceso denegado' });
  }
  next();
};

// Verificar propiedad o admin
const isSameUserOrAdmin = (req, res, next) => {
  if (req.usuario.rol === 'administrador' || 
      req.usuario.id === req.params.id) {
    next();
  } else {
    res.status(403).json({ msg: 'Acceso denegado' });
  }
};
```