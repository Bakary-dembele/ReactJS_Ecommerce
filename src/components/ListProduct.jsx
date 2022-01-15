import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/product')
      .then(response => response.json())
      .then(products => {
        setProducts(products);
      })
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (productId) => {
    fetch(`http://localhost:5000/product/${productId}`, { method: 'DELETE' })
      .then(response => {
        if (response.status !== 200) {
          setDeleteError(true);
          setTimeout(() => { setDeleteError(false) }, 5000)

          return;
        };

        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      {deleteError && <p className="alert alert-danger"> Il y a eu une erreur lors de la suppression</p>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => {
            return (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <Link to={`/admin/product/${product.id}/edit`} className="btn btn-primary">Edit</Link>
                  <button className="btn btn-danger" onClick={() => {handleDelete(product.id)}}>X</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default ListProduct;

/**
 * Faire la modification d'un produit en réutilisant le formulaire de création du produit.
 * Utiliser le même composant, l'url change, et le libellé du bouton change
 */