import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {
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

        const response = await fetch("http://localhost:5000/products", {
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



  async function deleteProduct(product) {
    try {
      const response = await fetch(`http://localhost:5000/delete_product/${product.id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ id: product.id }),
      });
        console.log(response);
      if (!response.ok) {
        throw new Error('response was not ok');
      }
  
      setData((item)=> item.filter(prod=> prod.id !== product.id) )
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  }
  

  return (
    <div className='products-list'>
    <h2>Products</h2>
      {data && (
        <ul>
          {data?.map(product => (
            <Link to={'/prod_option/' + product.id} key={product.id}>{product.name} <button onClick={()=> deleteProduct(product)}> X </button> </Link>

          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;
