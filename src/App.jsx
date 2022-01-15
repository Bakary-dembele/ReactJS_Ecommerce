import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import AboutAmel from "./components/AboutAmel";
import AboutKhalid from "./components/AboutKhalid";
import Contact from "./components/Contact";
import Home from "./components/Home";
import FormProduct from "./components/FormProduct";
import ListProduct from "./components/ListProduct";
import ShowProduct from "./components/ShowProduct";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import DeliveryAddress from "./components/DeliveryAddress";
import Payment from "./components/Payment";

const App = () => {
  let storedBasket = localStorage.getItem('basket');
  storedBasket = storedBasket ? JSON.parse(storedBasket) : []
  const [basket, setBasket] = useState(storedBasket);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  const handleBuyButtonClick = (productId) => {
    const newBasket = [...basket];
    const basketItem = newBasket.find(basketItem => {
      if (basketItem.productId === productId) {
        basketItem.quantity++;
        return true;
      }

      return false;
    });

    if (!basketItem) {
      newBasket.push({ productId: productId, quantity: 1 })
    }

    setBasket(newBasket);
  }


  const resetBasket = () => {
    setBasket([]);
  }

  return (
    <>

      <Navbar basket={basket} />

      <div className="container">
        <div className="row">
          <Routes>

            <Route path="/" element={<Home handleBuyButtonClick={handleBuyButtonClick} />} />

            <Route path="/about-us" element={<About />}>
              <Route path="/about-us/khalid" element={<AboutKhalid />} />
              <Route path="/about-us/amel" element={<AboutAmel />} />
              <Route index element={<h2>Default about us content</h2>} />
              <Route path="*" element={<h2>not found about us</h2>} />
            </Route>

            <Route path="/contact" element={<Contact />} />

            <Route path="/admin/product" element={<ListProduct />} />
            <Route path="/admin/product/new" element={<FormProduct />} />
            <Route path="/product/:id" element={<ShowProduct />} />
            <Route path="/admin/product/:id/edit" element={<FormProduct />} />

            <Route path="/cart" element={<Cart basket={basket} />} />

            <Route path="/delivery-address" element={<DeliveryAddress />} />

            <Route path="/payment" element={<Payment basket={basket} resetBasket={resetBasket} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
