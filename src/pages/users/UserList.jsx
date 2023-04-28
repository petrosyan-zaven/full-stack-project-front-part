import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';



function UserList() {

    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const headers = {
              'content-type': 'application/json',
            };
    
            if (token) {
              headers['Authorization'] = 'Bearer ' + token;
            }
    
            const response = await fetch("http://localhost:5000/userslist", {
              method: "GET",
              headers: headers
            });
    
            if (response.ok) {
              const data = await response.json();
              setData(data);
              console.log(data);
            } else if (response.status === 403) {
           
              console.log("Forbidden");
            } else {
              console.log("Error: " + response.status);
            }
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchData();
      }, [token]);

      


  return (
    <div className='users-list'>

        <h2>User List</h2>

         {data && (
        <ul>
          {data.map(user => (
            <Link  key={user.id} to={'/user_info/' + user.id}>{user.username} </Link>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserList