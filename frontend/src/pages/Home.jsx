import '../styles/Home.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TransferForm from '../components/transfers/TransferForm';
import TransferHistory from '../components/transfers/TransferHistory';
import PrizesGrid from '../components/prizes/PrizesGrid';
import MyExchanges from '../components/exchanges/MyExchanges';

function Home() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showTransferForm, setShowTransferForm] = useState(false);
    const [showPrizes, setShowPrizes] = useState(false);
    const [showExchanges, setShowExchanges] = useState(false);

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
            <button 
                className='boton-home'
                onClick={() => setShowPrizes(!showPrizes)}
            >
                {showPrizes ? 'Ocultar premios' : 'Ver premios'}
            </button>

            {showPrizes && <PrizesGrid />}

            <button 
                className='boton-home'
                onClick={() => setShowExchanges(!showExchanges)}
            >
                {showExchanges ? 'Ocultar mis canjes' : 'Ver mis canjes'}
            </button>

            {showExchanges && <MyExchanges />}

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