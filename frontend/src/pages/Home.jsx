import '../styles/Home.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TransferForm from '../components/transfers/TransferForm';
import TransferHistory from '../components/transfers/TransferHistory';

function Home() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showTransferForm, setShowTransferForm] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className='home-container'>
            <h1>¡Hola, {user.nombre}!</h1>
            <h2>Puntos a transferir:</h2>
            <label>{user.saldo_puntos_transferibles}/500</label>
           
            <progress 
                className='barra-puntos-transferibles'
                value={user.saldo_puntos_transferibles} 
                max='500'
            >
                {user.saldo_puntos_transferibles}/500
            </progress>
            <label>Tienes {500 - user.saldo_puntos_transferibles} puntos por transferir</label>
            
            <button 
                className='boton-home'
                onClick={() => setShowTransferForm(!showTransferForm)}
            >
                {showTransferForm ? 'Ocultar formulario' : 'Transferir puntos'}
            </button>

            {showTransferForm && <TransferForm />}
            
            <h2 style={{marginBottom:"0px"}}>
                Puntos para canjear: <span className="texto-puntos">{user.saldo_puntos_canjeables}</span>
            </h2>
            <button className='boton-home'>Ver premios</button>

            <TransferHistory />

            <button 
                className='boton-home' 
                onClick={() => {
                    logout();
                    navigate('/');
                }}
                style={{backgroundColor: '#ff4444'}}
            >
                Cerrar sesión
            </button>
        </div>
    );
}

export default Home;