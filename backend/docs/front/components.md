# Componentes Frontend

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
    if (await login(credentials)) {
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={credentials.email}
        onChange={e => setCredentials({
          ...credentials,
          email: e.target.value
        })}
      />
      <input
        type="password"
        value={credentials.password}
        onChange={e => setCredentials({
          ...credentials,
          password: e.target.value
        })}
      />
      <button type="submit">Login</button>
    </form>
  );
};
```

## Componentes de Usuario

### UserList
```jsx
const UserList = () => {
  const [users, setUsers] = useState([]);
  const { isAdmin } = usePermissions();

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  return (
    <div>
      <h2>Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>
                <button onClick={() => editUser(user.id)}>
                  Editar
                </button>
                {isAdmin && (
                  <button onClick={() => deleteUser(user.id)}>
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

## Componentes de Puntos

### PointsTransfer
```jsx
const PointsTransfer = () => {
  const [transfer, setTransfer] = useState({
    receptor_id: '',
    puntos: 0,
    mensaje: ''
  });

  const handleTransfer = async () => {
    try {
      await api.post('/transferencias', transfer);
      // Mostrar mensaje de éxito
    } catch (error) {
      // Manejar error
    }
  };

  return (
    <div>
      <h3>Transferir Puntos</h3>
      <form onSubmit={handleTransfer}>
        <select
          value={transfer.receptor_id}
          onChange={e => setTransfer({
            ...transfer,
            receptor_id: e.target.value
          })}
        >
          {/* Opciones de usuarios */}
        </select>
        <input
          type="number"
          value={transfer.puntos}
          onChange={e => setTransfer({
            ...transfer,
            puntos: parseInt(e.target.value)
          })}
        />
        <textarea
          value={transfer.mensaje}
          onChange={e => setTransfer({
            ...transfer,
            mensaje: e.target.value
          })}
        />
        <button type="submit">
          Transferir
        </button>
      </form>
    </div>
  );
};
```