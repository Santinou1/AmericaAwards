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
            const response = await axios.get('http://localhost:3000/api/transferencias', {
                headers: { 'x-auth-token': token }
            });
            setTransfers(response.data.transferencias || []);
            setError(null);
        } catch (err) {
            setError('Error al cargar las transferencias');
            console.error(err);
            setTransfers([]);
        } finally {
            setLoading(false);
        }
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
                                <tr key={transfer._id}>
                                    <td>{new Date(transfer.fecha).toLocaleString()}</td>
                                    <td>{transfer.emisor_id?.nombre || 'Usuario desconocido'}</td>
                                    <td>{transfer.receptor_id?.nombre || 'Usuario desconocido'}</td>
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