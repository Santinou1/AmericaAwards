import Login from './pages/Login';
import Home from './pages/Home';
import './styles/App.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {

  return (
    <Router>
      
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home /> }/>
      </Routes>
    </Router>
  )
}

export default App
