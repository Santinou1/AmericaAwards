// Middleware para verificar rol de administrador
exports.isAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'administrador') {
      next();
    } else {
      res.status(403).json({ msg: 'Acceso denegado. Se requiere rol de administrador.' });
    }
  };
  
  // Middleware para verificar si es el mismo usuario o un administrador
  exports.isSameUserOrAdmin = (req, res, next) => {
    if (
      req.usuario.rol === 'administrador' || 
      req.usuario.id === req.params.id
    ) {
      next();
    } else {
      res.status(403).json({ msg: 'Acceso denegado. No tiene permisos para esta acción.' });
    }
  };