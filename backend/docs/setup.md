# Configuración del Proyecto

## Requisitos Previos

- Node.js >= 14
- MongoDB
- Variables de entorno configuradas

## Variables de Entorno

### Backend (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost/gamificacion
JWT_SECRET=tu_secreto_jwt
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno
4. Iniciar el servidor:
   ```bash
   npm run dev
   ```