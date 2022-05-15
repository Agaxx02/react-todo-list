import React, {useState} from 'react'
import './App.css';
import Register from './pages/Register'
import Welcome from './pages/Welcome'
import Login from './pages/Login';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";


export const CredentialsContext = React.createContext();

function App() {
  const credentialsState = useState(null);

  return (
    <div className="App"> 
    <header className='header'>
      <span>Todo List</span>
    </header>
       <CredentialsContext.Provider value={credentialsState}>
      <BrowserRouter>
     <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login/>} />
     </Routes>
     </BrowserRouter>
     </CredentialsContext.Provider>
    </div>
  );
}

export default App;
