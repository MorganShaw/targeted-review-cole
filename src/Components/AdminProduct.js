//I think this is like the single product, and AdminProduct is the list of products. 

import React, { useState } from "react";

const AdminProduct = (props) => {
  const [isEditing, setEdit] = useState(false);
  const [input, setInput] = useState({
    name: props.product.name,
    price: props.product.price,
    description: props.product.description,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setEdit(!isEditing);
    setInput({
      name: props.product.name,
      price: props.product.price,
      description: props.product.description,
    });
  };

  return (
    <div key={props.index} className="admin-edit-box">
      {isEditing ? (
        <>
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
          <button onClick={toggleEdit}>Cancel</button>
          <button
            onClick={() => {
              props.saveEdit(
                props.product.product_id,
                input.name,
                input.price,
                input.description
              );
              toggleEdit();
            }}
          >
            Save Changes
          </button>
        </>
      ) : (
        <>
          <p>{props.product.name}</p>
          <p>{`Price: $${props.product.price}`}</p>
          <p>{`Description: ${props.product.description}`}</p>
          <button onClick={toggleEdit}>Edit</button>
        </>
      )}
      <button
        onClick={() => {
          props.deleteProduct(props.product.product_id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default AdminProduct;
