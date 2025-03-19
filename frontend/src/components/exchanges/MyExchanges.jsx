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
            console.log('Cargando mis canjes...');
            const response = await axios.get('http://172.31.50.155:3000/api/canjes/mis-canjes', {
                headers: { 'x-auth-token': token }
            });
            console.log('Respuesta de mis canjes:', response.data);
            setExchanges(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error('Error al cargar canjes:', err);
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
        if (!exchange?.Premio?.costo_puntos || !exchange?.cantidad) {
            return 0;
        }
        return exchange.Premio.costo_puntos * exchange.cantidad;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusText = (status) => {
        const statusMap = {
            'pendiente': 'Pendiente',
            'aprobado': 'Aprobado',
            'rechazado': 'Rechazado'
        };
        return statusMap[status] || 'Pendiente';
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
                            key={exchange.canje_id} 
                            className="exchange-card"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="exchange-header">
                                <span className="exchange-date">
                                    {formatDate(exchange.fecha)}
                                </span>
                                <span className={`status-badge ${exchange.estado || 'pendiente'}`}>
                                    {getStatusText(exchange.estado)}
                                </span>
                            </div>
                            <div className="exchange-content">
                                <h3>{exchange.Premio?.nombre || 'Premio no disponible'}</h3>
                                <p className="description">{exchange.Premio?.descripcion || 'Sin descripción'}</p>
                                <div className="exchange-details">
                                    <span>Cantidad: {exchange.cantidad}</span>
                                    <span>Total: {calculateTotalPoints(exchange)} puntos</span>
                                </div>
                                {exchange.Premio?.imagen_url && (
                                    <motion.img 
                                        src={exchange.Premio.imagen_url}
                                        alt={exchange.Premio.nombre}
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