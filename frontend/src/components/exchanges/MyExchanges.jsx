import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/MyExchanges.css';

function MyExchanges() {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadExchanges();
    }, []);

    const loadExchanges = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/canjes/mis-canjes', {
                headers: { 'x-auth-token': token }
            });
            setExchanges(response.data.canjes || []); // Asegurar que siempre sea un array
            setError(null);
        } catch (err) {
            setError('Error al cargar tus canjes');
            console.error(err);
            setExchanges([]); // Establecer un array vacío en caso de error
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
            <div className="my-exchanges-container">
                <h2>Mis Canjes</h2>
                <div className="loading-message">Cargando tus canjes...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-exchanges-container">
                <h2>Mis Canjes</h2>
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="my-exchanges-container">
            <h2>Mis Canjes</h2>
            {exchanges.length === 0 ? (
                <p className="no-exchanges">No has realizado ningún canje todavía</p>
            ) : (
                <div className="exchanges-list">
                    {exchanges.map(exchange => (
                        <div key={exchange._id || Math.random()} className="exchange-card">
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
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyExchanges;