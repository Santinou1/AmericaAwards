import '../styles/Admin.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UsersSection from '../components/admin/UsersSection';

function Admin() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        if (!user || user.rol !== 'administrador') {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user || user.rol !== 'administrador') return null;

    return (
        <div className='admin-container'>
            {!activeSection ? (
                <>
                    <h1>Panel de Administración</h1>
                    <div className='admin-grid'>
                        <button 
                            className='admin-button'
                            onClick={() => setActiveSection('users')}
                        >
                            <h2>Usuarios</h2>
                            <p>Gestionar usuarios del sistema</p>
                        </button>
                        <button className='admin-button'>
                            <h2>Premios</h2>
                            <p>Administrar catálogo de premios</p>
                        </button>
                        <button className='admin-button'>
                            <h2>Transferencias</h2>
                            <p>Ver historial de transferencias</p>
                        </button>
                        <button className='admin-button'>
                            <h2>Canjes</h2>
                            <p>Gestionar solicitudes de canje</p>
                        </button>
                    </div>
                </>
            ) : (
                <div className='admin-section'>
                    <button 
                        className='back-button'
                        onClick={() => setActiveSection(null)}
                    >
                        ← Volver al menú
                    </button>
                    {activeSection === 'users' && <UsersSection />}
                </div>
            )}
            <button 
                className='admin-logout' 
                onClick={() => {
                    logout();
                    navigate('/');
                }}
            >
                Cerrar sesión
            </button>
        </div>
    );
}

export default Admin;