//Note: this is not how you'd do this in a real production app. 
//I think this is like the list of products, and AdminProduct is the individual product. import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminProduct from "./AdminProduct";


const Admin = (props) => {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState({
    name: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const saveEdit = (id, name, price, description) => {
    axios
      .put(`/api/products/${id}`, { name, price, description })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProduct = () => {
    const { name, price, description } = input;
    axios
      .post("/api/products", { name, price, description })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (id) => {
    axios
      .delete(`/api/products/${id}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="admin-products-box">
      {products.map((product, index, array) => {
        return (
          <AdminProduct
            saveEdit={saveEdit}
            deleteProduct={deleteProduct}
            product={product}
            index={index}
          />
        );
      })}
      <section>
        <input name="name" value={input.name} onChange={handleChange} />
        <input
          name="price"
          type="number"
          value={input.price}
          onChange={handleChange}
        />
        <input
          name="description"
          value={input.description}
          onChange={handleChange}
        />
        <button onClick={addProduct}>Add Product</button>
      </section>
    </div>
  );
};

export default Admin;
