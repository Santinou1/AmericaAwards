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
            const endpoint = user.rol === 'administrador' 
                ? '/transferencias'
                : '/transferencias/mis-transferencias';
            
            const response = await axios.get(`http://localhost:3000/api${endpoint}`, {
                headers: { 'x-auth-token': token }
            });
            setTransfers(response.data.transferencias || []); // Asegurar que siempre sea un array
            setError(null);
        } catch (err) {
            setError('Error al cargar el historial de transferencias');
            console.error(err);
            setTransfers([]); // Establecer un array vacío en caso de error
        } finally {
            setLoading(false);
        }
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
            <h2>Historial de Transferencias</h2>
            {transfers.length === 0 ? (
                <p className="no-transfers">No hay transferencias para mostrar</p>
            ) : (
                <div className="transfers-list">
                    {transfers.map(transfer => (
                        <div key={transfer._id} className="transfer-card">
                            <div className="transfer-header">
                                <span className="transfer-date">
                                    {new Date(transfer.fecha).toLocaleDateString()}
                                </span>
                                <span className="transfer-points">
                                    {transfer.puntos} puntos
                                </span>
                            </div>
                            <div className="transfer-users">
                                <div className="transfer-user">
                                    <strong>De:</strong> {transfer.emisor_id?.nombre || 'Usuario desconocido'}
                                </div>
                                <div className="transfer-arrow">→</div>
                                <div className="transfer-user">
                                    <strong>Para:</strong> {transfer.receptor_id?.nombre || 'Usuario desconocido'}
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

export default TransferHistory