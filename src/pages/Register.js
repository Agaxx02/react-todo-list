import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CredentialsContext } from "../App";
import { handleErrors } from "./Login";

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useContext(CredentialsContext);

  const register = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/register`, {
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

  const navigate = useNavigate()

  return (
    <div className='register'>
      <h1 className='button'>Register</h1>
      {error && <span className='errorMessage' style={{ color: "red" }}>{error}</span>}
      <form onSubmit={register}>
        <input
         onChange={(e) => setUsername(e.target.value)}
         placeholder='username' />
        <br />
        <input 
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password' />
        <br />
        <button type='submit'>Register</button>
      </form>
    </div>

  )
}
