import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
function Login(){
    const navigate = useNavigate();
    const redirect = ()=>{
       navigate('/home')
    }
    return(
        <>
            <img 
            src='https://americagroupit.com/wp-content/uploads/2024/06/Logo_AG_Color_VF2024-01.png'
            alt='Logo de America Group'
            style={{width:'300px',height:'auto',display:'flex',justifySelf:'center',marginBottom:'10px'}}
        />
        <div className='login-container'>
          
            <h1>Inicio de sesión.</h1>
            <label>Correo Electrónico:</label>
            <input></input>
            <label>Contraseña:</label>
            <input></input>
            
            <button onClick={redirect}>Inciar sesión</button>
        </div>
        </>
    );
}

export default Login;