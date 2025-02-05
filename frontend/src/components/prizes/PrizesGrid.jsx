import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/PrizesGrid.css';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

function PrizesGrid() {
    const [prizes, setPrizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        loadPrizes();
    }, []);

    const loadPrizes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/premios', {
                headers: { 'x-auth-token': token }
            });
            setPrizes(response.data.premios);
            setError(null);
        } catch (err) {
            setError('Error al cargar los premios');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const triggerConfetti = () => {
        // Configuración del confeti
        const defaults = {
            spread: 360,
            ticks: 100,
            gravity: 0.5,
            decay: 0.94,
            startVelocity: 30,
            shapes: ['star'],
            colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
        };

        // Lanzar confeti desde diferentes ángulos
        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ['star']
        });

        confetti({
            ...defaults,
            particleCount: 25,
            scalar: 0.75,
            shapes: ['circle']
        });
    };

    const handleExchange = async (prizeId, costoPuntos) => {
        if (user.saldo_puntos_canjeables < costoPuntos) {
            setError('No tienes suficientes puntos para canjear este premio');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/canjes', 
                {
                    premio_id: prizeId,
                    cantidad: 1
                },
                {
                    headers: { 'x-auth-token': token }
                }
            );
            setError(null);
            // Activar animación de confeti
            triggerConfetti();
            // Recargar los premios para actualizar el stock
            loadPrizes();
        } catch (err) {
            setError(err.response?.data?.msg || 'Error al realizar el canje');
        }
    };

    if (loading) return <div>Cargando premios...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="prizes-grid-container">
            <h2>Catálogo de Premios</h2>
            <div className="prizes-grid">
                {prizes.map(prize => (
                    <div key={prize._id} className="prize-card">
                        <img 
                            src={prize.imagen_url} 
                            alt={prize.nombre}
                            className="prize-image"
                        />
                        <div className="prize-content">
                            <h3>{prize.nombre}</h3>
                            <p className="description">{prize.descripcion}</p>
                            <div className="prize-details">
                                <span className="cost">{prize.costo_puntos} puntos</span>
                                <span className="stock">Stock: {prize.stock}</span>
                            </div>
                            <button 
                                className="exchange-button"
                                onClick={() => handleExchange(prize._id, prize.costo_puntos)}
                                disabled={prize.stock === 0 || user.saldo_puntos_canjeables < prize.costo_puntos}
                            >
                                {prize.stock === 0 ? 'Sin stock' : 'Canjear'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PrizesGrid;