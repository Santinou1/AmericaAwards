# Mock Data para Frontend

Este directorio contiene datos mock para pruebas del frontend.

## Estructura

### Usuarios
- Admin con saldo alto
- Empleados con diferentes saldos
- Usuario sin saldo transferible
- Usuario sin saldo canjeable

### Premios
- Premios disponibles con stock
- Premio sin stock
- Diferentes rangos de costos

### Transferencias
- Con mensaje
- Sin mensaje
- Diferentes cantidades

### Canjes
- Estado pendiente
- Estado aprobado
- Estado rechazado
- Diferentes cantidades

### Errores
- Autenticación
- Usuarios
- Transferencias
- Canjes
- Premios

## Uso

```javascript
import mockData from '../mocks/mockData';

// Acceder a los datos
const { usuarios, premios, transferencias, canjes, errores } = mockData;

// Ejemplo de uso en componentes
const UserList = () => {
  // Simular carga de usuarios
  const [users, setUsers] = useState(mockData.usuarios);
  
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};