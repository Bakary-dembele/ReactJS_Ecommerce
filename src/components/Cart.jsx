import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ basket }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let productList = [];
    let sumTotal = 0;

    basket.forEach(basketItem => {
      fetch(`http://localhost:5000/product/${basketItem.productId}`)
        .then(response => response.json())
        .then(product => {
          product.quantity = basketItem.quantity;
          productList = [...productList, product];
          setCart(productList);

          sumTotal += product.price * product.quantity;
          setTotal(sumTotal);
        })
        .catch(error => console.error(error));
    });
  }, [basket]);

  return (
    <>
      <hr />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(cartItem => {
            return (
              <tr key={cartItem.id}>
                <th scope="row">{cartItem.id}</th>
                <td>{cartItem.name}</td>
                <td>{cartItem.price}</td>
                <td>{cartItem.quantity}</td>
                <td>{cartItem.price * cartItem.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2>Total : {total}</h2>
      <hr />
      <button onClick={() => { navigate('/delivery-address') }} className="btn btn-primary">Paiement</button>
    </>
  )
}

export default Cart;