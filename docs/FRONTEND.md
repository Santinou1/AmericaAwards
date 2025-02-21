# Frontend Documentation - America Awards

## Estructura de Componentes

### Componentes Principales

#### 1. Layout
- **Header**: Barra de navegación y menú
- **Sidebar**: Menú lateral con opciones según rol
- **Footer**: Pie de página con información

#### 2. Autenticación
- **Login**: Formulario de inicio de sesión
- **AuthContext**: Manejo del estado de autenticación
- **PrivateRoute**: Protección de rutas por rol

#### 3. Dashboard
- **UserDashboard**: Panel principal para usuarios
- **AdminDashboard**: Panel principal para administradores
- **Statistics**: Componente de estadísticas

#### 4. Transferencias
- **TransferForm**: Formulario para realizar transferencias
- **TransferHistory**: Historial de transferencias
- **TransferCard**: Tarjeta individual de transferencia

#### 5. Canjes
- **ExchangeForm**: Formulario para realizar canjes
- **MyExchanges**: Lista de canjes del usuario
- **ExchangeCard**: Tarjeta individual de canje
- **ExchangesSection**: Sección de administración de canjes

#### 6. Premios
- **PrizeList**: Lista de premios disponibles
- **PrizeCard**: Tarjeta individual de premio
- **PrizeForm**: Formulario para crear/editar premios

## Estados y Contextos

### 1. AuthContext
```javascript
{
    user: {
        id: number,
        nombre: string,
        email: string,
        rol: string,
        saldo_puntos_canjeables: number
    },
    isAuthenticated: boolean,
    loading: boolean,
    login: (email, password) => void,
    logout: () => void
}
```

### 2. TransferContext
```javascript
{
    transfers: [],
    loading: boolean,
    error: string | null,
    createTransfer: (data) => void,
    getTransfers: () => void
}
```

### 3. ExchangeContext
```javascript
{
    exchanges: [],
    loading: boolean,
    error: string | null,
    createExchange: (data) => void,
    getExchanges: () => void,
    updateExchangeStatus: (id, status) => void
}
```

## Hooks Personalizados

### 1. useAuth
```javascript
const { user, isAuthenticated, loading, login, logout } = useAuth();
```

### 2. useTransfers
```javascript
const { transfers, loading, error, createTransfer } = useTransfers();
```

### 3. useExchanges
```javascript
const { exchanges, loading, error, createExchange } = useExchanges();
```

## Servicios API

### authService
```javascript
const authService = {
    login: async (credentials) => {...},
    logout: () => {...},
    getCurrentUser: () => {...}
};
```

### transferService
```javascript
const transferService = {
    create: async (data) => {...},
    getAll: async () => {...},
    getMyTransfers: async () => {...}
};
```

### exchangeService
```javascript
const exchangeService = {
    create: async (data) => {...},
    getAll: async () => {...},
    getMyExchanges: async () => {...},
    updateStatus: async (id, status) => {...}
};
```

## Manejo de Errores

### 1. Error Boundaries
```javascript
class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    render() {
        if (this.state.hasError) {
            return <ErrorPage error={this.state.error} />;
        }
        return this.props.children;
    }
}
```

### 2. Interceptores Axios
```javascript
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            // Redirigir a login
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);
```

## Estilos y Temas

### 1. Variables CSS
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
}
```

### 2. Breakpoints
```javascript
const breakpoints = {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
};
```

## Optimización

### 1. Code Splitting
```javascript
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Transfers = React.lazy(() => import('./pages/Transfers'));
const Exchanges = React.lazy(() => import('./pages/Exchanges'));
```

### 2. Memorización
```javascript
const MemoizedComponent = React.memo(({ data }) => {
    return <div>{data}</div>;
});
```

### 3. Carga Perezosa de Imágenes
```javascript
<img 
    loading="lazy"
    src={imageUrl}
    alt={description}
/>
```

## Testing

### 1. Pruebas de Componentes
```javascript
describe('Login Component', () => {
    it('should render login form', () => {
        render(<Login />);
        expect(screen.getByRole('form')).toBeInTheDocument();
    });
});
```

### 2. Pruebas de Hooks
```javascript
describe('useAuth', () => {
    it('should return user when logged in', () => {
        const { result } = renderHook(() => useAuth());
        expect(result.current.user).toBeDefined();
    });
});
```

## Despliegue

### 1. Variables de Entorno
```env
VITE_API_URL=http://localhost:4000
VITE_ENV=development
```

### 2. Scripts de Construcción
```json
{
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview",
        "test": "vitest"
    }
}
```
