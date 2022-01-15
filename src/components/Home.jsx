import { useEffect, useState } from "react";
import Card from "./Card";

const Home = ({handleBuyButtonClick}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/product`)
      .then(response => response.json())
      .then(products => setProducts(products))
      .catch(error => console.error(error));
  }, [])

  return (
    <>
      {products.map((product, index) => {
        return (
          <Card key={index} data={{
            id: product.id,
            title: product.name,
            text: product.price,
            cta: `/product/${product.id}`,
            secondaryCta: true,
            handleBuyButtonClick: handleBuyButtonClick
          }} />
        )
      })}
    </>
  )
}

export default Home;
