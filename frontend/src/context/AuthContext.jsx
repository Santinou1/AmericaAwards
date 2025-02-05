import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar el usuario usando el token almacenado
  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:3000/api/auth', {
        headers: {
          'x-auth-token': token
        }
      });
      
      setUser(response.data.usuario);
      setError(null);
    } catch (err) {
      console.error('Error al cargar usuario:', err);
      localStorage.removeItem('token');
      setUser(null);
      setError('Sesión expirada');
    } finally {
      setLoading(false);
    }
  };

  // Cargar usuario al montar el componente
  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:3000/api/auth', {
        email,
        password
      });
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      await loadUser(); // Cargar la información del usuario después del login
      return true;
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al iniciar sesión');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
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