# Autenticación en el Front-end

## Configuración del Cliente HTTP

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Interceptor para incluir token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## Hook de Autenticación

```javascript
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/auth', credentials);
      localStorage.setItem('token', data.token);
      await loadUser();
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const loadUser = async () => {
    try {
      const { data } = await api.get('/auth');
      setUser(data.usuario);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return { user, loading, login, logout };
};
```

## Componentes de Autenticación

### LoginForm
```jsx
const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(credentials);
    if (success) {
      // Redirigir al dashboard
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
    </form>
  );
};
```

### AuthGuard
```jsx
const AuthGuard = ({ children, requireAdmin }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.rol !== 'administrador') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
```

## Manejo de Permisos

```javascript
export const usePermissions = () => {
  const { user } = useAuth();

  return {
    isAdmin: user?.rol === 'administrador',
    canEditUser: (userId) => user?.rol === 'administrador' || user?.id === userId,
    canTransferPoints: () => user?.saldo_puntos_transferibles > 0,
    canRedeemPrize: (prizePoints) => user?.saldo_puntos_canjeables >= prizePoints
  };
};
```