import '../styles/Home.css';
function Home(){
    return(
        <div className='home-container'>
            <h1>¡Hola, {`[nombre]`}!</h1>
            <h2>Puntos a transferir:</h2>
            <label>300/500</label>
           
            <progress className='barra-puntos-transferibles'value='300' max='500'>300/500</progress>
            <label>Tienes 200 puntos por transferir</label>
            <button className='boton-home'>Transferir puntos</button>
            <h2 style={{marginBottom:"0px"}}>Puntos para canjear: <span class="texto-puntos">700</span></h2>
            <button className='boton-home'>Ver premios</button>
        </div>
    );
}

export default Home;