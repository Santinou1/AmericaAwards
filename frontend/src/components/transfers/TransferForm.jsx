import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../styles/TransferForm.css';

function TransferForm() {
    const [users, setUsers] = useState([]);
    const [transfer, setTransfer] = useState({
        receptor_id: '',
        puntos: 0,
        mensaje: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/usuarios', {
                headers: { 'x-auth-token': token }
            });
            // Filtrar el usuario actual y ordenar por nombre
            const filteredUsers = response.data
                .filter(u => u._id !== user.id)
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setUsers(filteredUsers);
        } catch (err) {
            setError('Error al cargar usuarios');
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/transferencias', transfer, {
                headers: { 'x-auth-token': token }
            });
            setSuccess(true);
            setTransfer({
                receptor_id: '',
                puntos: 0,
                mensaje: ''
            });
        } catch (err) {
            setError(err.response?.data?.msg || 'Error al realizar la transferencia');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="transfer-form-container">
            <h2>Transferir Puntos</h2>
            <form onSubmit={handleSubmit} className="transfer-form">
                <div className="form-group">
                    <label>Seleccionar Usuario:</label>
                    <select
                        value={transfer.receptor_id}
                        onChange={(e) => setTransfer({...transfer, receptor_id: e.target.value})}
                        required
                    >
                        <option value="">Selecciona un usuario</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>
                                {user.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Puntos a Transferir:</label>
                    <input
                        type="number"
                        value={transfer.puntos}
                        onChange={(e) => setTransfer({...transfer, puntos: parseInt(e.target.value)})}
                        min="1"
                        max={user.saldo_puntos_transferibles}
                        required
                    />
                    <small>Saldo disponible: {user.saldo_puntos_transferibles} puntos</small>
                </div>

                <div className="form-group">
                    <label>Mensaje (opcional):</label>
                    <textarea
                        value={transfer.mensaje}
                        onChange={(e) => setTransfer({...transfer, mensaje: e.target.value})}
                        placeholder="¿Por qué quieres reconocer a este compañero?"
                        maxLength="200"
                    />
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">¡Transferencia realizada con éxito!</div>}

                <button 
                    type="submit" 
                    disabled={loading || !transfer.receptor_id || transfer.puntos <= 0 || transfer.puntos > user.saldo_puntos_transferibles}
                    className="transfer-button"
                >
                    {loading ? 'Procesando...' : 'Transferir Puntos'}
                </button>
            </form>
        </div>
    );
}

export default TransferForm;