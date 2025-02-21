import '../styles/Login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

function Login() {
    const navigate = useNavigate();
    const { login, loading, error, user } = useAuth();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            if (user.rol === 'administrador') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Iniciando login con:', credentials.email);
        const success = await login(credentials.email, credentials.password);
        console.log('Resultado del login:', success);
        
        if (!success) {
            console.error('Error durante el login:', error);
            Swal.fire({
                title: 'Error',
                text: error || 'Error al iniciar sesión',
                icon: 'error',
                confirmButtonColor: '#FFA500'
            });
        } else {
            console.log('Login exitoso, esperando redirección...');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.img 
                src='https://americagroupit.com/wp-content/uploads/2024/06/Logo_AG_Color_VF2024-01.png'
                alt='Logo de America Group'
                style={{width:'300px',height:'auto',display:'flex',justifySelf:'center',marginBottom:'10px'}}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            />
            <motion.div 
                className='login-container'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1>Inicio de sesión</h1>
                <form onSubmit={handleSubmit}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label>Correo Electrónico:</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </motion.div>
                    <motion.button 
                        type="submit" 
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default Login;