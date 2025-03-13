# Guía de Pruebas de API

Esta guía explica cómo realizar pruebas de los diferentes endpoints de la API usando archivos `.http`.

## Requisitos
- VS Code con la extensión "REST Client" instalada
- Servidor API corriendo localmente en el puerto 3000

## Variables Comunes
```http
@baseUrl = http://localhost:3000/api
@authToken = {{login.response.body.token}}
```

## Pasos para Probar

1. **Crear Primer Admin**
   - Usar `auth.http`
   - Ejecutar la petición "Crear Primer Usuario admin"
   - Este paso solo funciona una vez cuando la base de datos está vacía

2. **Login**
   - Usar `auth.http`
   - Ejecutar la petición "Login Usuario"
   - El token se guardará automáticamente para otras peticiones

3. **Probar Otros Endpoints**
   - Usar los archivos específicos para cada tipo de recurso
   - El token se incluirá automáticamente en las peticiones que lo requieran

## Manejo de Errores
Cada archivo incluye ejemplos de casos de error comunes para probar la robustez de la API.