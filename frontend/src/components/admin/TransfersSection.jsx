import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/TransfersSection.css';

function TransfersSection() {
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTransfers();
    }, []);

    const loadTransfers = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Cargando transferencias de admin...');
            const response = await axios.get('http://172.31.50.156:3000/api/transferencias', {
                headers: { 'x-auth-token': token }
            });
            console.log('Respuesta de transferencias:', response.data);
            setTransfers(Array.isArray(response.data) ? response.data : []);
            setError(null);
        } catch (err) {
            console.error('Error al cargar transferencias:', err);
            setError('Error al cargar las transferencias');
            setTransfers([]);
        } finally {
            setLoading(false);
        }
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
            <div className="transfers-section">
                <h2>Historial de Transferencias</h2>
                <div className="loading-message">Cargando transferencias...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="transfers-section">
                <h2>Historial de Transferencias</h2>
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="transfers-section">
            <h2>Historial de Transferencias</h2>
            
            {transfers.length === 0 ? (
                <p className="no-transfers">No hay transferencias para mostrar</p>
            ) : (
                <div className="transfers-table-container">
                    <table className="transfers-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Emisor</th>
                                <th>Receptor</th>
                                <th>Puntos</th>
                                <th>Mensaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transfers.map(transfer => (
                                <tr key={transfer.transferencia_id}>
                                    <td>{formatDate(transfer.fecha)}</td>
                                    <td>{transfer.emisor?.nombre || 'Usuario eliminado'}</td>
                                    <td>{transfer.receptor?.nombre || 'Usuario eliminado'}</td>
                                    <td className="points-cell">{transfer.puntos}</td>
                                    <td>{transfer.mensaje || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TransfersSection;