import Login from './pages/Login';
import Home from './pages/Home';
import './styles/App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/home' element={<Home />}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App