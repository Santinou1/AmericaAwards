// Middleware para verificar rol de admin
exports.isAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'admin') {
      next();
    } else {
      res.status(403).json({ msg: 'Acceso denegado. Se requiere rol de admin.'+ req.usuario.rol });
    }
  };
  
  // Middleware para verificar si es el mismo usuario o un admin
  exports.isSameUserOrAdmin = (req, res, next) => {
    if (
      req.usuario.rol === 'admin' || 
      req.usuario.id === req.params.id
    ) {
      next();
    } else {
      res.status(403).json({ msg: 'Acceso denegado. No tiene permisos para esta acción.' });
    }
  };