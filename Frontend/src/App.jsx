import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import ParticleContainer from './components/ui/ParticleContianer';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './Pages/Signup';
import Login from './Pages/Login';
import { useAuthContext } from './context/authContext';
import Chat from './Pages/Chat';


function App() {
  const {state} = useAuthContext();
  return (
    <div>
      <BrowserRouter>
        <ParticleContainer className="z-0"/>
          <Routes>
            <Route 
              path="/"
              element={state ? <Navigate to="/chat"/>:<Home />}
            />
            <Route 
              path="/signup"
              element={state ? <Navigate to="/chat"/>:<SignUp />}
            />
            <Route 
              path="/login"
              element={state ? <Navigate to="/chat"/>:<Login />}
            />
            <Route 
              path="/chat"
              element={state ? <Chat />: <Navigate to="/"/>}
            />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
