import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from "../App";

export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};
export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useContext(CredentialsContext);
    const navigate = useNavigate()
    
    const login = (e) => {
      e.preventDefault();
      fetch(`http://localhost:4000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password
        })
        navigate('/')
      })
      .catch((error) => {
        setError(error.message);
      });
    }
  
  
    return (
      <div className='login'>
        <h1 className='button'>Login</h1>
        {error && <span className='errorMessage' style={{ color: "red" }}>{error}</span>}
        <form onSubmit={login}>
          <input className='inputs'
           onChange={(e) => setUsername(e.target.value)}
           placeholder='username' />
          <br />
          <input className='inputs'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password' />
          <br />
          <button type='submit'>Login</button>
        </form>
      </div>
  
    )
  }
  