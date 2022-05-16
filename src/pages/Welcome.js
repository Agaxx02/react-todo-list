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
      {credentials && <button onClick={Logout}>Logout</button>}
        <h1 className='button'>Welcome {credentials && credentials.username}</h1>
        <div className='buttonContainer'>
        {!credentials && <Link to="/login" className='button' id='loginButton'>Login</Link>}
        {!credentials && <Link to="/register" className='button' id='registerButton'>Register</Link>}
        {credentials && <Todos />}
        </div>
    </div>
  )
}
