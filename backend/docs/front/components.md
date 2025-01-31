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

## Componentes de Transferencias

### TransferForm
```jsx
const TransferForm = () => {
  const [transfer, setTransfer] = useState({
    receptor_id: '',
    puntos: 0,
    mensaje: ''
  });
  const { user } = useAuth();

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transferencias', transfer);
      // Mostrar mensaje de éxito
      setTransfer({ receptor_id: '', puntos: 0, mensaje: '' });
    } catch (error) {
      // Manejar error
    }
  };

  return (
    <form onSubmit={handleTransfer}>
      <h3>Transferir Puntos</h3>
      <div>
        <label>Receptor:</label>
        <select
          value={transfer.receptor_id}
          onChange={e => setTransfer({
            ...transfer,
            receptor_id: e.target.value
          })}
          required
        >
          <option value="">Seleccionar usuario</option>
          {/* Opciones de usuarios */}
        </select>
      </div>
      <div>
        <label>Puntos:</label>
        <input
          type="number"
          min="1"
          value={transfer.puntos}
          onChange={e => setTransfer({
            ...transfer,
            puntos: parseInt(e.target.value)
          })}
          required
        />
      </div>
      <div>
        <label>Mensaje:</label>
        <textarea
          value={transfer.mensaje}
          onChange={e => setTransfer({
            ...transfer,
            mensaje: e.target.value
          })}
          placeholder="¿Por qué quieres reconocer a este compañero?"
        />
      </div>
      <button 
        type="submit"
        disabled={transfer.puntos > user.saldo_puntos_transferibles}
      >
        Transferir Puntos
      </button>
    </form>
  );
};
```

### TransferHistory
```jsx
const TransferHistory = () => {
  const [transfers, setTransfers] = useState([]);
  const { isAdmin } = usePermissions();

  useEffect(() => {
    loadTransfers();
  }, []);

  const loadTransfers = async () => {
    try {
      const response = await api.get(
        isAdmin ? '/transferencias' : '/transferencias/mis-transferencias'
      );
      setTransfers(response.data.transferencias);
    } catch (error) {
      // Manejar error
    }
  };

  return (
    <div>
      <h3>Historial de Transferencias</h3>
      <div className="transfers-list">
        {transfers.map(transfer => (
          <div key={transfer._id} className="transfer-item">
            <p>
              <strong>De:</strong> {transfer.emisor_id.nombre}
              <strong>Para:</strong> {transfer.receptor_id.nombre}
            </p>
            <p><strong>Puntos:</strong> {transfer.puntos}</p>
            {transfer.mensaje && (
              <p><strong>Mensaje:</strong> {transfer.mensaje}</p>
            )}
            <p><strong>Fecha:</strong> {new Date(transfer.fecha).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};