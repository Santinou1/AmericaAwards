import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../styles/TransferHistory.css';

function TransferHistory() {
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        loadTransfers();
    }, []);

    const loadTransfers = async () => {
        try {
            const token = localStorage.getItem('token');
            const endpoint = user?.rol === 'admin' 
                ? '/api/transferencias'
                : '/api/transferencias/mis-transferencias';
            
            console.log('Cargando transferencias desde:', endpoint);
            console.log('Usuario actual:', user);
            
            const response = await axios.get(`http://172.31.50.156:3000${endpoint}`, {
                headers: { 'x-auth-token': token }
            });
            
            console.log('Respuesta de transferencias:', response.data);
            
            // Asegurarnos de que siempre trabajamos con un array
            const transfersData = Array.isArray(response.data) ? response.data : 
                                response.data.transferencias || [];
            
            setTransfers(transfersData);
            setError(null);
        } catch (err) {
            console.error('Error al cargar transferencias:', err);
            setError('Error al cargar el historial de transferencias');
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
            <div className="transfer-history-container">
                <h2>Historial de Transferencias</h2>
                <div className="loading-message">Cargando historial...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="transfer-history-container">
                <h2>Historial de Transferencias</h2>
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="transfer-history-container">
            <h2>
                {user?.rol === 'admin' 
                    ? 'Todas las Transferencias' 
                    : 'Mis Transferencias'}
            </h2>
            {transfers.length === 0 ? (
                <p className="no-transfers">No hay transferencias para mostrar</p>
            ) : (
                <div className="transfers-list">
                    {transfers.map(transfer => (
                        <div key={transfer.transferencia_id} className="transfer-card">
                            <div className="transfer-header">
                                <span className="transfer-date">
                                    {formatDate(transfer.fecha)}
                                </span>
                                <span className="transfer-points">
                                    {transfer.puntos} puntos
                                </span>
                            </div>
                            <div className="transfer-users">
                                <div className="transfer-user">
                                    <strong>De:</strong> {transfer.emisor?.nombre || 'Usuario eliminado'}
                                </div>
                                <div className="transfer-arrow">→</div>
                                <div className="transfer-user">
                                    <strong>Para:</strong> {transfer.receptor?.nombre || 'Usuario eliminado'}
                                </div>
                            </div>
                            {transfer.mensaje && (
                                <div className="transfer-message">
                                    "{transfer.mensaje}"
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TransferHistory;