import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserInfo() {

  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const { id }= useParams();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'content-type': 'application/json',
        };

        if (token) {
          headers['Authorization'] = 'Bearer ' + token;
        }

        const response = await fetch(`http://localhost:5000/user/${id}` , {
          method: "GET",
          headers: headers
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
          console.log(data);
          console.log(Array.isArray(data));
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

 console.log(data);


  


  return (
    <div className='UserInfo'> 
        <h2>User info</h2>
        <h4>{data.username}, role - {data.role}</h4>
     </div>
  )
}

export default UserInfo
