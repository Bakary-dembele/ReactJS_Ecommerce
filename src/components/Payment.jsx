import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = ({ basket, resetBasket }) => {
  const navigate = useNavigate();

  const [isPaymentValidated, setIsPaymentValidated] = useState();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState();

  const deliveryAddress = JSON.parse(localStorage.getItem('delivery-address'));

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

  const sendPaymentToBackend = () => {
    return Math.random() > 0.5;
  }

  const handlePay = () => {
    if (isPaymentValidated) return;

    if (!sendPaymentToBackend()) {
      setIsPaymentValidated(false);
      return;
    }

    setIsPaymentValidated(true);

    fetch('http://localhost:5000/order', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ products: cart, deliveryAddress: deliveryAddress, total: total })
    })
      .then(response => response.json())
      .then(order => {
        setOrder(order);
        resetBasket();
        setTimeout(() => {
          navigate('/');
        }, 3000)
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      {order && <p className="alert alert-success">Votre commande {order.id} est validé. Vous allez être rediriger vers la page d'accueil</p>}
      {isPaymentValidated === false && <p className="alert alert-warning">Le paiement n'est pas passé</p>}
      <button onClick={handlePay}
        className={`btn btn-success ${isPaymentValidated === true ? 'disabled' : ''}`}
      >Pay</button>
    </>
  )
}

export default Payment;