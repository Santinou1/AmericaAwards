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
    const [currentSection, setCurrentSection] = useState('dashboard');

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user) return null;

    const renderSection = () => {
        switch(currentSection) {
            case 'transfers':
                return (
                    <>
                        <TransferForm />
                        <TransferHistory />
                    </>
                );
            case 'prizes':
                return <PrizesGrid />;
            case 'exchanges':
                return <MyExchanges />;
            default:
                return (
                    <div className="dashboard-stats">
                        <h2>Mis Puntos</h2>
                        <div className="points-container">
                            <div className="points-card">
                                <h3>Puntos a transferir</h3>
                                <div className="points-progress">
                                    <progress 
                                        value={user.saldo_puntos_transferibles} 
                                        max={1000}
                                    />
                                    <span>{user.saldo_puntos_transferibles}/{1000}</span>
                                </div>
                                <p>Tienes {user.saldo_puntos_transferibles} puntos para transferir</p>
                            </div>
                            <div className="points-card">
                                <h3>Puntos para canjear</h3>
                                <div className="points-value">
                                    <span className="texto-puntos">{user.saldo_puntos_canjeables}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className='home-container'>
            <header className="home-header">
                <h1>¡Hola, {user.nombre}!</h1>
                <button 
                    className='logout-button' 
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}
                >
                    Cerrar sesión
                </button>
            </header>

            <nav className="home-nav">
                <button 
                    className={`nav-button ${currentSection === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setCurrentSection('dashboard')}
                >
                    Dashboard
                </button>
                <button 
                    className={`nav-button ${currentSection === 'transfers' ? 'active' : ''}`}
                    onClick={() => setCurrentSection('transfers')}
                >
                    Transferencias
                </button>
                <button 
                    className={`nav-button ${currentSection === 'prizes' ? 'active' : ''}`}
                    onClick={() => setCurrentSection('prizes')}
                >
                    Premios
                </button>
                <button 
                    className={`nav-button ${currentSection === 'exchanges' ? 'active' : ''}`}
                    onClick={() => setCurrentSection('exchanges')}
                >
                    Mis Canjes
                </button>
            </nav>

            <main className="home-content">
                {renderSection()}
            </main>
        </div>
    );
}

export default Home;