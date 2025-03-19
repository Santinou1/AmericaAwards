import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/PrizesGrid.css';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function PrizesGrid() {
    const [prizes, setPrizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    useEffect(() => {
        loadPrizes();
    }, []);

    const loadPrizes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://172.31.50.155:3000/api/premios', {
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
        const defaults = {
            spread: 360,
            ticks: 100,
            gravity: 0.5,
            decay: 0.94,
            startVelocity: 30,
            shapes: ['star'],
            colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
        };

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

    const handleExchange = async (prize) => {
        if (user.saldo_puntos_canjeables < prize.costo_puntos) {
            Swal.fire({
                title: 'Puntos insuficientes',
                text: 'No tienes suficientes puntos para canjear este premio',
                icon: 'error',
                confirmButtonColor: '#FFA500'
            });
            return;
        }

        const result = await Swal.fire({
            title: '¿Confirmar canje?',
            html: `
                <div class="swal2-prize-details">
                    <img src="${prize.imagen_url}" alt="${prize.nombre}" style="max-width: 200px; border-radius: 8px;">
                    <h3>${prize.nombre}</h3>
                    <p>Costo: ${prize.costo_puntos} puntos</p>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#FFA500',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, canjear',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                await axios.post('http://172.31.50.155:3000/api/canjes', 
                    {
                        premio_id: prize.premio_id,
                        cantidad: 1
                    },
                    {
                        headers: { 'x-auth-token': token }
                    }
                );
                
                triggerConfetti();
                
                await Swal.fire({
                    title: '¡Premio canjeado!',
                    text: 'Tu solicitud de canje ha sido registrada exitosamente',
                    icon: 'success',
                    confirmButtonColor: '#FFA500'
                });
                
                loadPrizes();
            } catch (err) {
                Swal.fire({
                    title: 'Error',
                    text: err.response?.data?.msg || 'Error al realizar el canje',
                    icon: 'error',
                    confirmButtonColor: '#FFA500'
                });
            }
        }
    };

    if (loading) return (
        <div className="loading-container">
            <motion.div
                className="loading-spinner"
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <p>Cargando premios...</p>
        </div>
    );

    if (error) return (
        <motion.div
            className="error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {error}
        </motion.div>
    );

    return (
        <motion.div
            className="prizes-grid-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Catálogo de Premios
            </motion.h2>
            
            <div className="prizes-grid" ref={ref}>
                {prizes.map((prize, index) => (
                    <motion.div
                        key={prize._id}
                        className="prize-card"
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1
                        }}
                        whileHover={{
                            scale: 1.03,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
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
                            <motion.button 
                                className="exchange-button"
                                onClick={() => handleExchange(prize)}
                                disabled={prize.stock === 0 || user.saldo_puntos_canjeables < prize.costo_puntos}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {prize.stock === 0 ? 'Sin stock' : 'Canjear'}
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default PrizesGrid;