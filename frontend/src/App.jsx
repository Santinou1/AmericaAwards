import Login from './pages/Login';
import './styles/App.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {

  return (
    <Router>
      <img 
        src='https://americagroupit.com/wp-content/uploads/2024/06/Logo_AG_Color_VF2024-01.png'
        alt='Logo de America Group'
        style={{width:'300px',height:'auto',display:'flex',justifySelf:'center',marginBottom:'10px'}}
      />
      <Routes>
        <Route path='/' element={<Login />}/>
      </Routes>
    </Router>
  )
}

export default App
