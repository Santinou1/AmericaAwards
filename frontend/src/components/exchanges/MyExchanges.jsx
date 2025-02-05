import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/MyExchanges.css';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

function MyExchanges() {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadExchanges();
    }, []);

    const loadExchanges = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/canjes/mis-canjes', {
                headers: { 'x-auth-token': token }
            });
            setExchanges(response.data.canjes || []);
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: 'Error al cargar tus canjes',
                icon: 'error',
                confirmButtonColor: '#FFA500'
            });
        } finally {
            setLoading(false);
        }
    };

    const calculateTotalPoints = (exchange) => {
        if (!exchange?.premio_id?.costo_puntos || !exchange?.cantidad) {
            return 0;
        }
        return exchange.premio_id.costo_puntos * exchange.cantidad;
    };

    if (loading) {
        return (
            <div className="loading-container">
                <motion.div
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p>Cargando tus canjes...</p>
            </div>
        );
    }

    return (
        <motion.div 
            className="my-exchanges-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Mis Canjes</h2>
            {exchanges.length === 0 ? (
                <motion.p 
                    className="no-exchanges"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    No has realizado ningún canje todavía
                </motion.p>
            ) : (
                <div className="exchanges-list">
                    {exchanges.map((exchange, index) => (
                        <motion.div 
                            key={exchange._id || Math.random()} 
                            className="exchange-card"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="exchange-header">
                                <span className="exchange-date">
                                    {exchange.fecha ? new Date(exchange.fecha).toLocaleDateString() : 'Fecha no disponible'}
                                </span>
                                <span className={`status-badge ${exchange.estado || 'pendiente'}`}>
                                    {exchange.estado || 'pendiente'}
                                </span>
                            </div>
                            <div className="exchange-content">
                                <h3>{exchange.premio_id?.nombre || 'Premio no disponible'}</h3>
                                <p className="description">{exchange.premio_id?.descripcion || 'Sin descripción'}</p>
                                <div className="exchange-details">
                                    <span>Cantidad: {exchange.cantidad || 0}</span>
                                    <span>Total: {calculateTotalPoints(exchange)} puntos</span>
                                </div>
                                {exchange.premio_id?.imagen_url && (
                                    <motion.img 
                                        src={exchange.premio_id.imagen_url}
                                        alt={exchange.premio_id.nombre}
                                        className="prize-image"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

export default MyExchanges;