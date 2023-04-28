import React from "react";
import { useState } from "react";

function CreateProduct() {
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
    fetch("http://localhost:5000/create_product", {
      method: "POST",
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
    <div className="createProduct">
      <h2>Add product</h2>

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

export default CreateProduct;
