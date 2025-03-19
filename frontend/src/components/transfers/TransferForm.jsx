import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../styles/TransferForm.css';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

function TransferForm() {
    const [users, setUsers] = useState([]);
    const [transfer, setTransfer] = useState({
        receptor_id: '',
        puntos: 0,
        mensaje: ''
    });
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://172.31.50.156:3000/api/usuarios/para-transferencias', {
                headers: { 'x-auth-token': token }
            });
            const filteredUsers = response.data
                .filter(u => u.idUsuario !== user.id)
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setUsers(filteredUsers);
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: 'Error al cargar usuarios. Por favor, intenta de nuevo.',
                icon: 'error',
                confirmButtonColor: '#FFA500'
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://172.31.50.156:3000/api/transferencias', transfer, {
                headers: { 'x-auth-token': token }
            });
            
            await Swal.fire({
                title: '¡Transferencia exitosa!',
                text: 'Los puntos han sido transferidos correctamente',
                icon: 'success',
                confirmButtonColor: '#FFA500'
            });

            setTransfer({
                receptor_id: '',
                puntos: 0,
                mensaje: ''
            });
            
            // Recargar los usuarios después de una transferencia exitosa
            loadUsers();
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err.response?.data?.msg || 'Error al realizar la transferencia',
                icon: 'error',
                confirmButtonColor: '#FFA500'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            className="transfer-form-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Transferir Puntos</h2>
            <form onSubmit={handleSubmit} className="transfer-form">
                <motion.div 
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <label>Seleccionar Usuario:</label>
                    <select
                        value={transfer.receptor_id}
                        onChange={(e) => setTransfer({...transfer, receptor_id: e.target.value})}
                        required
                    >
                        <option value="" key="default">Selecciona un usuario</option>
                        {users.map(user => (
                            <option key={user.idUsuario} value={user.idUsuario}>
                                {user.nombre}
                            </option>
                        ))}
                    </select>
                </motion.div>

                <motion.div 
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <label>Puntos a Transferir:</label>
                    <input
                        type="number"
                        value={transfer.puntos}
                        onChange={(e) => setTransfer({...transfer, puntos: parseInt(e.target.value) || 0})}
                        min="1"
                        max={user.saldo_puntos_transferibles}
                        required
                    />
                    <small>Saldo disponible: {user.saldo_puntos_transferibles} puntos</small>
                </motion.div>

                <motion.div 
                    className="form-group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <label>Mensaje (opcional):</label>
                    <textarea
                        value={transfer.mensaje}
                        onChange={(e) => setTransfer({...transfer, mensaje: e.target.value})}
                        placeholder="¿Por qué quieres reconocer a este compañero?"
                        maxLength="200"
                    />
                </motion.div>

                <motion.button 
                    type="submit" 
                    disabled={loading || !transfer.receptor_id || transfer.puntos <= 0 || transfer.puntos > user.saldo_puntos_transferibles}
                    className="transfer-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {loading ? 'Procesando...' : 'Transferir Puntos'}
                </motion.button>
            </form>
        </motion.div>
    );
}

export default TransferForm;