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
            const response = await axios.get('http://localhost:3000/api/canjes', {
                headers: { 'x-auth-token': token }
            });
            setExchanges(response.data.canjes);
            setError(null);
        } catch (err) {
            setError('Error al cargar los canjes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (exchangeId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:3000/api/canjes/${exchangeId}/estado`,
                { estado: newStatus },
                { headers: { 'x-auth-token': token } }
            );
            loadExchanges(); // Recargar la lista después de actualizar
        } catch (err) {
            setError('Error al actualizar el estado del canje');
            console.error(err);
        }
    };

    if (loading) return <div>Cargando canjes...</div>;
    if (error) return <div className="error-message">{error}</div>;

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
                                <tr key={exchange._id} className={`status-${exchange.estado}`}>
                                    <td>{new Date(exchange.fecha).toLocaleString()}</td>
                                    <td>{exchange.usuario_id.nombre}</td>
                                    <td>{exchange.premio_id.nombre}</td>
                                    <td>{exchange.cantidad}</td>
                                    <td className="points-cell">
                                        {exchange.cantidad * exchange.premio_id.costo_puntos}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${exchange.estado}`}>
                                            {exchange.estado}
                                        </span>
                                    </td>
                                    <td>
                                        {exchange.estado === 'pendiente' && (
                                            <div className="action-buttons">
                                                <button
                                                    className="approve-button"
                                                    onClick={() => handleStatusChange(exchange._id, 'aprobado')}
                                                >
                                                    Aprobar
                                                </button>
                                                <button
                                                    className="reject-button"
                                                    onClick={() => handleStatusChange(exchange._id, 'rechazado')}
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