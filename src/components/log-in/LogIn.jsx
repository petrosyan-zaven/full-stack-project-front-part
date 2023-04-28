import { useState } from 'react'
import React from 'react'
import { useNavigate, Link } from 'react-router-dom'


function Login() {
  
  const navigate = useNavigate();
  
  const [ formData, setFormData ] = useState({
    username: '',
    password: ''
  })
  
  
  const handleLogin = async (e) => {

     e.preventDefault()
      setFormData ({username: "",password: "" })
       

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      const token = data.jwt
      console.log(token)
      navigate('/home')

      localStorage.setItem('token', token);
      if("error" in data){ alert(data.error)}
    } catch (err) {
      console.error(err);
    
    }
  };


return (

<div className='login-box'>

<h2>Login</h2>
      <form onSubmit={handleLogin}>
     

      <div className='box'>
      <label>
          Username:
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </label>
      </div>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </label>
            <div className='log'>
              <button className='btn-login'>Login</button>
              <Link className='register-btn' to={'/register'}>Register</Link>
            </div>
      </form>
      


    </div>
  )
}

export default Login

//111Aaa666.