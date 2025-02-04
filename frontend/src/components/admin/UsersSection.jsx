import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/UsersSection.css';

function UsersSection() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newUser, setNewUser] = useState({
        nombre: '',
        email: '',
        password: '',
        rol: 'empleado',
        saldo_puntos_canjeables: 0,
        saldo_puntos_transferibles: 0
    });

    const loadUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/usuarios', {
                headers: { 'x-auth-token': token }
            });
            setUsers(response.data);
            setError(null);
        } catch (err) {
            setError('Error al cargar usuarios');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/usuarios', newUser, {
                headers: { 'x-auth-token': token }
            });
            setShowCreateForm(false);
            setNewUser({
                nombre: '',
                email: '',
                password: '',
                rol: 'empleado',
                saldo_puntos_canjeables: 0,
                saldo_puntos_transferibles: 0
            });
            loadUsers();
        } catch (err) {
            setError('Error al crear usuario');
            console.error(err);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3000/api/usuarios/${userId}`, {
                    headers: { 'x-auth-token': token }
                });
                loadUsers();
            } catch (err) {
                setError('Error al eliminar usuario');
                console.error(err);
            }
        }
    };

    if (loading) return <div>Cargando usuarios...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="users-section">
            <h2>Gestión de Usuarios</h2>
            <button 
                className="create-user-button"
                onClick={() => setShowCreateForm(true)}
            >
                Crear Nuevo Usuario
            </button>

            {showCreateForm && (
                <div className="create-user-form">
                    <h3>Crear Nuevo Usuario</h3>
                    <form onSubmit={handleCreateUser}>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                value={newUser.nombre}
                                onChange={(e) => setNewUser({...newUser, nombre: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input
                                type="password"
                                value={newUser.password}
                                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Rol:</label>
                            <select
                                value={newUser.rol}
                                onChange={(e) => setNewUser({...newUser, rol: e.target.value})}
                            >
                                <option value="empleado">Empleado</option>
                                <option value="administrador">Administrador</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Puntos Canjeables:</label>
                            <input
                                type="number"
                                value={newUser.saldo_puntos_canjeables}
                                onChange={(e) => setNewUser({...newUser, saldo_puntos_canjeables: parseInt(e.target.value)})}
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <label>Puntos Transferibles:</label>
                            <input
                                type="number"
                                value={newUser.saldo_puntos_transferibles}
                                onChange={(e) => setNewUser({...newUser, saldo_puntos_transferibles: parseInt(e.target.value)})}
                                min="0"
                            />
                        </div>
                        <div className="form-buttons">
                            <button type="submit">Crear Usuario</button>
                            <button 
                                type="button" 
                                onClick={() => setShowCreateForm(false)}
                                className="cancel-button"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="users-table">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Puntos Canjeables</th>
                            <th>Puntos Transferibles</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.nombre}</td>
                                <td>{user.email}</td>
                                <td>{user.rol}</td>
                                <td>{user.saldo_puntos_canjeables}</td>
                                <td>{user.saldo_puntos_transferibles}</td>
                                <td>
                                    <button 
                                        className="delete-button"
                                        onClick={() => handleDeleteUser(user._id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersSection;