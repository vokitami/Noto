import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/themeContext';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Nota from './pages/Nota';
import ProtectedRoute from './componentes/ProtectedRoute';
import { AuthProvider } from './context/authContext';

function App() {
  
  return (
  <>
  <AuthProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<Auth/>}/> {/*registro y login */}

        {/*ruta protegida */}  
          <Route path='/dashboard' element={<ProtectedRoute> 
            <Dashboard/> </ProtectedRoute>}/>
          
          <Route path='nota/:id' element={<ProtectedRoute>
            <Nota/>
          </ProtectedRoute>}/>
        
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
  
  </>
  )
}

export default App
