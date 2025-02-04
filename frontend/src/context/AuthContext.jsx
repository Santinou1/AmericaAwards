import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      
      // Obtener información del usuario
      const userResponse = await axios.get('http://localhost:3000/api/auth', {
        headers: {
          'x-auth-token': token
        }
      });
      
      setUser(userResponse.data.usuario);
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