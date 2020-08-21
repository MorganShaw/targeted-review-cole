import React, {useState, useEffect} from "react";
import axios from 'axios'

const Dashboard = (props) => {
    //products is state, setProducts is setState, and useState is the value. setProduct will update the value of state to 
  const [products, setProducts] = useState([])
  
  useEffect(()=> {
    axios
    .get('/api/products')
    .then(res=> {
      setProducts(res.data)
    })
    .catch(err=> {
      console.log(err)
    })
  }, [])
  //If you leave that array bracket empty, it only fires once. If you put a value in it, it'll fire every time that value changes. Don't put the state in it, or it will cause an infinite loop. So, in this example, don't use products in that array.

  const addToCart = (id) => {
    axios.post(`/api/cart/${id}`)
  }

  return (
    <section>
      <h1>You have arrived at the dashboard</h1>
      <div>
        {products.map((product, index, array) => {
          return (
            <div key={index}>
              <h4>{product.name}</h4>
              <p>{`Price: $${product.price}`}</p>
              <p>{`Description: ${product.description}`}</p>
              <button onClick={()=> {
                addToCart(product.product_id)
              }}>Add to Cart</button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Dashboard;

//We don't have the admin functionality here. So anyone can add a product. 