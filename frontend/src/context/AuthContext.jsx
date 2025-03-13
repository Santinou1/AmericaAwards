import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Configurar interceptor global de axios
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
      console.log('Token agregado a la petición:', token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar el usuario usando el token almacenado
  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No hay token almacenado');
        setLoading(false);
        return null;
      }

      console.log('Intentando cargar usuario con token:', token);
      const response = await axios.get('http://localhost:3000/api/auth');
      
      console.log('Respuesta de loadUser:', response.data);
      
      if (!response.data.usuario) {
        console.error('El servidor devolvió un usuario nulo');
        localStorage.removeItem('token');
        setUser(null);
        setError('Error al cargar la información del usuario');
        return null;
      }
      
      setUser(response.data.usuario);
      setError(null);
      return response.data.usuario;
    } catch (err) {
      console.error('Error detallado al cargar usuario:', err.response || err);
      localStorage.removeItem('token');
      setUser(null);
      setError(err.response?.data?.msg || 'Error al cargar usuario');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Cargar usuario al montar el componente
  useEffect(() => {
    console.log('AuthProvider montado, verificando token...');
    loadUser();
  }, []);

  const login = async (email, usuarioPassword) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Intentando login en:', 'http://localhost:3000/api/auth');
      
      const response = await axios.post('http://localhost:3000/api/auth', {
        email,
        usuarioPassword
      });
      
      console.log('Respuesta del login:', response.data);
      
      if (!response.data.token) {
        throw new Error('No se recibió token del servidor');
      }
      
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Token guardado:', token);
      
      // Configurar el token en axios para futuras peticiones
      axios.defaults.headers.common['x-auth-token'] = token;
      
      const userData = await loadUser();
      if (!userData) {
        throw new Error('No se pudo cargar la información del usuario');
      }
      
      return true;
    } catch (err) {
      console.error('Error detallado del login:', err.response || err);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['x-auth-token'];
      setError(err.response?.data?.msg || err.message || 'Error al iniciar sesión');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};