import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CredentialsContext } from "../App";
import { Todos } from '../components/Todos';

export default function Welcome() {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const Logout = () => {
setCredentials(null)
  }
  return (
    <div className='welcome'>
        <h1 className='button'>Welcome {credentials && credentials.username}</h1>
        <div className='buttonContainer'>
        {!credentials && <Link to="/register" className='button' id='registerButton'>Register</Link>}
        {!credentials && <Link to="/login" className='button' id='loginButton'>Login</Link>}
        {credentials && <Todos />}
      {credentials && <button onClick={Logout} id='logoutButton' className='button'>Logout</button>}
        </div>
    </div>
  )
}
