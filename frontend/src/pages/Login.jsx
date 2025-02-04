import '../styles/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const { login, loading, error } = useAuth();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(credentials.email, credentials.password);
        if (success) {
            navigate('/home');
        }
    };

    return (
        <>
            <img 
                src='https://americagroupit.com/wp-content/uploads/2024/06/Logo_AG_Color_VF2024-01.png'
                alt='Logo de America Group'
                style={{width:'300px',height:'auto',display:'flex',justifySelf:'center',marginBottom:'10px'}}
            />
            <div className='login-container'>
                <h1>Inicio de sesión</h1>
                <form onSubmit={handleSubmit}>
                    <label>Correo Electrónico:</label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;