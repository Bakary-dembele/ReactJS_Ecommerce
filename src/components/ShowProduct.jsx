import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

const ShowProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then(response => response.json())
      .then(product => setProduct(product))
      .catch(error => console.error(error));
  }, [id]);

  return (
    <>
      {product && 
      <Card data={{
        title: product.name,
        text: product.price,
      }} />}
    </>
  )
}

export default ShowProduct;