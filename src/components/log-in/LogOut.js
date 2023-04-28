import React from 'react'

function LogOut() {

    const handleLogout = () => {
        localStorage.removeItem("token");
    };

  return (
    <div className='logout'>
        <button onClick={handleLogout} className='btn-logout'>Logout</button>
    </div>
  )
}

export default LogOut