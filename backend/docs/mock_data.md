# Mock Data para Desarrollo Frontend

## Usuarios

```javascript
const usuarios = [
  {
    id: "1",
    nombre: "Admin Principal",
    email: "admin@empresa.com",
    rol: "administrador",
    saldo_puntos_canjeables: 1000,
    saldo_puntos_transferibles: 500,
    fecha_creacion: "2023-12-20T10:00:00Z",
    fecha_actualizacion: "2023-12-20T10:00:00Z"
  },
  {
    id: "2",
    nombre: "Juan Pérez",
    email: "juan@empresa.com",
    rol: "empleado",
    saldo_puntos_canjeables: 750,
    saldo_puntos_transferibles: 200,
    fecha_creacion: "2023-12-20T11:00:00Z",
    fecha_actualizacion: "2023-12-20T11:00:00Z"
  },
  {
    id: "3",
    nombre: "María García",
    email: "maria@empresa.com",
    rol: "empleado",
    saldo_puntos_canjeables: 500,
    saldo_puntos_transferibles: 150,
    fecha_creacion: "2023-12-20T12:00:00Z",
    fecha_actualizacion: "2023-12-20T12:00:00Z"
  }
];

## Premios

```javascript
const premios = [
  {
    id: "1",
    nombre: "Día Libre",
    descripcion: "Un día libre a elección",
    costo_puntos: 1000,
    stock: 10,
    fecha_creacion: "2023-12-20T10:00:00Z",
    fecha_actualizacion: "2023-12-20T10:00:00Z"
  },
  {
    id: "2",
    nombre: "Vale de Almuerzo",
    descripcion: "Vale para almuerzo en restaurantes asociados",
    costo_puntos: 300,
    stock: 50,
    fecha_creacion: "2023-12-20T10:00:00Z",
    fecha_actualizacion: "2023-12-20T10:00:00Z"
  },
  {
    id: "3",
    nombre: "Curso Online",
    descripcion: "Curso a elección en plataforma de aprendizaje",
    costo_puntos: 800,
    stock: 15,
    fecha_creacion: "2023-12-20T10:00:00Z",
    fecha_actualizacion: "2023-12-20T10:00:00Z"
  },
  {
    id: "4",
    nombre: "Gift Card",
    descripcion: "Gift Card de $50 para tiendas seleccionadas",
    costo_puntos: 500,
    stock: 25,
    fecha_creacion: "2023-12-20T10:00:00Z",
    fecha_actualizacion: "2023-12-20T10:00:00Z"
  }
];
```

## Transferencias

```javascript
const transferencias = [
  {
    id: "1",
    emisor_id: "2",
    receptor_id: "3",
    puntos: 100,
    mensaje: "¡Gracias por tu ayuda con el proyecto!",
    fecha: "2023-12-20T14:30:00Z"
  },
  {
    id: "2",
    emisor_id: "3",
    receptor_id: "2",
    puntos: 50,
    mensaje: "Excelente presentación en la reunión",
    fecha: "2023-12-20T15:45:00Z"
  },
  {
    id: "3",
    emisor_id: "2",
    receptor_id: "3",
    puntos: 75,
    mensaje: "Por tu apoyo en la capacitación",
    fecha: "2023-12-20T16:20:00Z"
  }
];
```

## Canjes

```javascript
const canjes = [
  {
    id: "1",
    usuario_id: "2",
    premio_id: "2",
    cantidad: 1,
    fecha: "2023-12-20T13:00:00Z",
    estado: "aprobado"
  },
  {
    id: "2",
    usuario_id: "3",
    premio_id: "4",
    cantidad: 1,
    fecha: "2023-12-20T14:00:00Z",
    estado: "pendiente"
  },
  {
    id: "3",
    usuario_id: "2",
    premio_id: "1",
    cantidad: 1,
    fecha: "2023-12-20T15:00:00Z",
    estado: "aprobado"
  }
];
```

## Respuestas de API Simuladas

### Login Exitoso
```javascript
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  usuario: {
    id: "1",
    nombre: "Admin Principal",
    email: "admin@empresa.com",
    rol: "administrador"
  }
}
```

### Error de Autenticación
```javascript
{
  msg: "Credenciales inválidas"
}
```

### Creación Exitosa
```javascript
{
  msg: "Recurso creado exitosamente",
  data: { /* datos del recurso creado */ }
}
```

### Error de Validación
```javascript
{
  errores: [
    {
      msg: "El campo es requerido",
      param: "nombre",
      location: "body"
    }
  ]
}
```

## Uso del Mock Data

```javascript
// Ejemplo de uso con MSW (Mock Service Worker)
import { rest } from 'msw';

export const handlers = [
  // Get usuarios
  rest.get('/api/usuarios', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(usuarios)
    );
  }),

  // Get premios
  rest.get('/api/premios', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(premios)
    );
  }),

  // Login
  rest.post('/api/auth', (req, res, ctx) => {
    const { email, password } = req.body;
    
    if (email === "admin@empresa.com" && password === "admin123456") {
      return res(
        ctx.status(200),
        ctx.json({
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          usuario: usuarios[0]
        })
      );
    }
    
    return res(
      ctx.status(401),
      ctx.json({ msg: "Credenciales inválidas" })
    );
  })
];
```