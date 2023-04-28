import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductOption() {
  // const [product, setProduct] = useState([]);
  const token = localStorage.getItem("token");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "content-type": "application/json",
        };

        if (token) {
          headers["Authorization"] = "Bearer " + token;
        }

        const response = await fetch(`http://localhost:5000/products/${id}`, {
          method: "GET",
          headers: headers,
        });

        if (response.ok) {
          const data = await response.json();
          setProduct(data);
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

  const [product, setProduct] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
  });

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const headers = {
      "content-type": "application/json",
    };

    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    setProduct({ image: "", name: "", price: "", description: "" });
    fetch(`http://localhost:5000/update_product/${id}`, {
      method: "PUT",
      headers: headers, // Use the headers object defined here
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error(" error adding the game:", error);
      });
  };

  return (
    <div className="edit">
      <h2>Edit product</h2>

      <form onSubmit={onSubmit}>
        <div className="add-inp">
          <input
            type="text"
            placeholder="image"
            value={product.image}
            onChange={(e) => onInputChange(e)}
            name="image"
          />
        </div>

        <div className="add-inp">
          <input
            type="text"
            placeholder="name"
            value={product.name}
            onChange={(e) => onInputChange(e)}
            name="name"
          />
        </div>

        <div className="add-inp">
          <input
            type="text"
            placeholder="price"
            value={product.price}
            onChange={(e) => onInputChange(e)}
            name="price"
          />
        </div>

        <div className="add-inp">
          <input
            type="text"
            placeholder="description"
            value={product.description}
            onChange={(e) => onInputChange(e)}
            name="description"
          />
        </div>

        <button type="submit">Add product</button>
      </form>
    </div>
  );
}

export default ProductOption;
