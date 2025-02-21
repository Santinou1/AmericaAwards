const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  console.log('Headers recibidos:', req.headers);
  // Obtener el token del header
  const token = req.header('x-auth-token');
  console.log('Token recibido:', token);

  // Verificar si no hay token
  if (!token) {
    console.log('No se recibió token en la petición');
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    // Verificar el token
    console.log('Intentando verificar token con secret:', process.env.JWT_SECRET ? 'Secret existe' : 'Secret NO existe');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded);
    
    // Agregar el usuario del token al request
    req.usuario = decoded.usuario;
    next();
  } catch (err) {
    console.error('Error al verificar token:', err);
    res.status(401).json({ msg: 'Token no válido' });
  }
};