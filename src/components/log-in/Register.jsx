import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.username,
          password: user.password
        })
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log('User created!');
        navigate('/')
      } else {
        console.log('Error registering user:', data.status);
      }
    } catch (err) {
      console.error('Error registering user:', err);
    }

    setUser({ username: '', password: '' });
  }

  return (
    <div className="register-box">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
      <div className='box'>
      <label>
          Username:
          <input
            type="text"
            value={user.username}
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
          />
        </label>
      </div>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
        </label>
            <div className='log'>
              <button className='btn-login'>Register</button>
              
            </div>
      </form>
    </div>
  );
}

export default Register;
