import '../styles/Login.css';
function Login(){
    return(
        <div className='login-container'>
            
            <h1>Inicio de sesión</h1>
            <label>Correo Electrónico:</label>
            <input></input>
            <label>Contraseña:</label>
            <input></input>
            
            <button>Inciar sesión</button>
        </div>
    );
}

export default Login;