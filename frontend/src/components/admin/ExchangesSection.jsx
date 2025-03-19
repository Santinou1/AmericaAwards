import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/ExchangesSection.css';

function ExchangesSection() {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadExchanges();
    }, []);

    const loadExchanges = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Cargando canjes...');
            const response = await axios.get('http://172.31.50.155:3000/api/canjes', {
                headers: { 'x-auth-token': token }
            });
            console.log('Respuesta de canjes:', response.data);
            setExchanges(Array.isArray(response.data) ? response.data : []);
            setError(null);
        } catch (err) {
            console.error('Error al cargar los canjes:', err);
            setError('Error al cargar los canjes');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (exchangeId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`Actualizando estado del canje ${exchangeId} a ${newStatus}`);
            await axios.put(
                `http://172.31.50.155:3000/api/canjes/${exchangeId}/estado`,
                { estado: newStatus },
                { headers: { 'x-auth-token': token } }
            );
            loadExchanges(); // Recargar la lista después de actualizar
        } catch (err) {
            console.error('Error al actualizar el estado:', err);
            setError('Error al actualizar el estado del canje');
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

    if (loading) {
        return (
            <div className="exchanges-section">
                <h2>Gestión de Canjes</h2>
                <div className="loading-message">Cargando canjes...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="exchanges-section">
                <h2>Gestión de Canjes</h2>
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="exchanges-section">
            <h2>Gestión de Canjes</h2>
            
            {exchanges.length === 0 ? (
                <p className="no-exchanges">No hay canjes para mostrar</p>
            ) : (
                <div className="exchanges-table-container">
                    <table className="exchanges-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Usuario</th>
                                <th>Premio</th>
                                <th>Cantidad</th>
                                <th>Puntos Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exchanges.map(exchange => (
                                <tr key={exchange.canje_id} className={`status-${exchange.estado || 'pendiente'}`}>
                                    <td>{formatDate(exchange.fecha)}</td>
                                    <td>{exchange.Usuario?.nombre || 'Usuario eliminado'}</td>
                                    <td>{exchange.Premio?.nombre || 'Premio no disponible'}</td>
                                    <td>{exchange.cantidad}</td>
                                    <td className="points-cell">
                                        {calculateTotalPoints(exchange)}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${exchange.estado || 'pendiente'}`}>
                                            {exchange.estado || 'pendiente'}
                                        </span>
                                    </td>
                                    <td>
                                        {(exchange.estado || 'pendiente') === 'pendiente' && (
                                            <div className="action-buttons">
                                                <button
                                                    className="approve-button"
                                                    onClick={() => handleStatusChange(exchange.canje_id, 'aprobado')}
                                                >
                                                    Aprobar
                                                </button>
                                                <button
                                                    className="reject-button"
                                                    onClick={() => handleStatusChange(exchange.canje_id, 'rechazado')}
                                                >
                                                    Rechazar
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ExchangesSection;