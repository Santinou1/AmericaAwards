# Guía de Implementación Front-end

## Configuración Inicial

### 1. Variables de Entorno
```env
VITE_API_URL=http://localhost:3000/api
```

### 2. Cliente HTTP
Configurar cliente HTTP (axios) con interceptores para:
- Incluir token en headers
- Manejar errores de autenticación
- Refrescar token cuando sea necesario

## Flujo de Autenticación

### 1. Primer Inicio
```javascript
// Solo si no hay usuarios en el sistema
const crearPrimerAdmin = async (datos) => {
  const response = await axios.post('/usuarios/primer-admin', datos);
  // Guardar token en localStorage
  localStorage.setItem('token', response.data.token);
  return response.data;
};
```

### 2. Login Normal
```javascript
const login = async (credentials) => {
  const response = await axios.post('/auth', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};
```

### 3. Verificar Autenticación
```javascript
const verificarAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const response = await axios.get('/auth');
    return response.data.usuario;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};
```

## Gestión de Usuarios

### Permisos y Roles
```javascript
const isAdmin = (user) => user?.rol === 'admin';
const canEditUser = (currentUser, targetUserId) => 
  isAdmin(currentUser) || currentUser.id === targetUserId;
```

### Operaciones CRUD
```javascript
// Listar usuarios (solo admin)
const getUsers = async () => {
  const response = await axios.get('/usuarios');
  return response.data;
};

// Obtener usuario específico
const getUser = async (id) => {
  const response = await axios.get(`/usuarios/${id}`);
  return response.data;
};

// Crear usuario (solo admin)
const createUser = async (userData) => {
  const response = await axios.post('/usuarios', userData);
  return response.data;
};

// Actualizar usuario
const updateUser = async (id, userData) => {
  const response = await axios.put(`/usuarios/${id}`, userData);
  return response.data;
};

// Eliminar usuario (solo admin)
const deleteUser = async (id) => {
  await axios.delete(`/usuarios/${id}`);
};
```

## Manejo de Errores

### Estructura de Errores
```javascript
try {
  // operación
} catch (error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // No autenticado
        break;
      case 403:
        // No autorizado
        break;
      case 404:
        // No encontrado
        break;
      default:
        // Error general
    }
  }
}
```

## Estructura de Carpetas Recomendada

```
src/
├── api/              # Servicios de API
├── components/       # Componentes reutilizables
├── contexts/         # Contextos (Auth, etc.)
├── hooks/           # Hooks personalizados
├── pages/           # Páginas/Rutas principales
├── utils/           # Utilidades y helpers
└── App.jsx          # Componente principal
```