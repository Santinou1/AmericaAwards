import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../styles/UsersSection.css';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

function UsersSection() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const editFormRef = useRef(null);

    const loadUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://172.31.50.155:3000/api/usuarios', {
                headers: { 'x-auth-token': token }
            });
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: 'Error al cargar usuarios',
                icon: 'error',
                confirmButtonColor: '#FFA500'
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleEditUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const updateData = {
                saldo_puntos_canjeables: selectedUser.saldo_puntos_canjeables,
                saldo_puntos_transferibles: selectedUser.saldo_puntos_transferibles
            };
            
            await axios.put(`http://172.31.50.155:3000/api/usuarios/${selectedUser.idUsuario}`, updateData, {
                headers: { 'x-auth-token': token }
            });

            await Swal.fire({
                title: '¡Usuario actualizado!',
                text: 'Los cambios han sido guardados exitosamente',
                icon: 'success',
                confirmButtonColor: '#FFA500'
            });

            setShowEditForm(false);
            setSelectedUser(null);
            loadUsers();
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err.response?.data?.msg || 'Error al actualizar usuario',
                icon: 'error',
                confirmButtonColor: '#FFA500'
            });
        }
    };

    const handleDeleteUser = async (userId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FFA500',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://172.31.50.155:3000/api/usuarios/${userId}`, {
                    headers: { 'x-auth-token': token }
                });

                await Swal.fire({
                    title: '¡Eliminado!',
                    text: 'El usuario ha sido eliminado',
                    icon: 'success',
                    confirmButtonColor: '#FFA500'
                });

                loadUsers();
            } catch (err) {
                Swal.fire({
                    title: 'Error',
                    text: err.response?.data?.msg || 'Error al eliminar usuario',
                    icon: 'error',
                    confirmButtonColor: '#FFA500'
                });
            }
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <motion.div
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p>Cargando usuarios...</p>
            </div>
        );
    }

    return (
        <motion.div 
            className="users-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Gestión de Usuarios</h2>

            {showEditForm && selectedUser && (
                <motion.div 
                    className="create-user-form"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    ref={editFormRef}
                >
                    <h3>Editar Usuario</h3>
                    <form onSubmit={handleEditUser}>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                value={selectedUser.nombre}
                                readOnly
                                className="readonly-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={selectedUser.email}
                                readOnly
                                className="readonly-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Rol:</label>
                            <input
                                type="text"
                                value={selectedUser.rol}
                                readOnly
                                className="readonly-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Puntos Canjeables:</label>
                            <input
                                type="number"
                                value={selectedUser.saldo_puntos_canjeables}
                                onChange={(e) => setSelectedUser({...selectedUser, saldo_puntos_canjeables: parseInt(e.target.value)})}
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <label>Puntos Transferibles:</label>
                            <input
                                type="number"
                                value={selectedUser.saldo_puntos_transferibles}
                                onChange={(e) => setSelectedUser({...selectedUser, saldo_puntos_transferibles: parseInt(e.target.value)})}
                                min="0"
                            />
                        </div>
                        <div className="form-buttons">
                            <motion.button 
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Guardar Cambios
                            </motion.button>
                            <motion.button 
                                type="button" 
                                onClick={() => {
                                    setShowEditForm(false);
                                    setSelectedUser(null);
                                }}
                                className="cancel-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Cancelar
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            )}

            <motion.div 
                className="users-table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
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
                        {users.map((user, index) => (
                            <motion.tr 
                                key={user.idUsuario}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <td>{user.nombre}</td>
                                <td>{user.email}</td>
                                <td>{user.rol}</td>
                                <td>{user.saldo_puntos_canjeables}</td>
                                <td>{user.saldo_puntos_transferibles}</td>
                                <td>
                                    <motion.button 
                                        className="edit-button"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setShowEditForm(true);
                                            // Añadir un pequeño retraso para asegurar que el formulario esté renderizado
                                            setTimeout(() => {
                                                if (editFormRef.current) {
                                                    editFormRef.current.scrollIntoView({ 
                                                        behavior: 'smooth',
                                                        block: 'start'
                                                    });
                                                }
                                            }, 100);
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Editar
                                    </motion.button>
                                    <motion.button 
                                        className="delete-button"
                                        onClick={() => handleDeleteUser(user.idUsuario)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Eliminar
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </motion.div>
    );
}

export default UsersSection;