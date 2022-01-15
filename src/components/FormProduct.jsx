import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FormProduct = () => {
  const { id } = useParams();

  const initialFormState = { name: '', price: '', stock: '', picture: '' };
  const [form, setForm] = useState({ ...initialFormState });
  const [showSuccesEditMessage, setShowSuccesEditMessage] = useState(false);

  useEffect(() => {
    if (!id) {
      setForm({ ...initialFormState });
      return;
    };

    fetch(`http://localhost:5000/product/${id}`)
      .then(response => response.json())
      .then(product => {
        setForm({
          name: product.name,
          price: product.price,
          stock: product.stock,
          picture: product.picture
        });
      })
      .catch(error => console.error(error));
    /** @todo fix missing dependency initialFormState */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:5000/product', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(() => setForm({...initialFormState}))
      .catch(error => console.error(error));
  }

  const handleChange = (event) => {
    const newData = { ...form };
    newData[event.target.name] = event.target.value;

    setForm(newData);
  }

  const handleEdit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:5000/product/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(() => {
        setShowSuccesEditMessage(true);
        setTimeout(() => {setShowSuccesEditMessage(false)}, 5000)
      })
      .catch(error => console.error(error));
  }

  return (
    <form onSubmit={id ? handleEdit : handleSubmit}>
      {showSuccesEditMessage && <p className="alert alert-success">Votre produit a bien été modifié.</p>}
      <div>
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" name="name" id="name" className="form-control" onChange={handleChange} value={form.name} />
      </div>
      <div>
        <label htmlFor="price" className="form-label">Price</label>
        <input type="text" name="price" id="price" className="form-control" onChange={handleChange} value={form.price} />
      </div>
      <div>
        <label htmlFor="stock" className="form-label">Stock</label>
        <input type="text" name="stock" id="stock" className="form-control" onChange={handleChange} value={form.stock} />
      </div>
      <div>
        <label htmlFor="picture" className="form-label">picture</label>
        <input type="text" name="picture" id="picture" className="form-control" onChange={handleChange} value={form.picture} />
      </div>

      <div><input type="submit" value={id ? 'Modifier' : 'Créer'} className="btn btn-info" /></div>
    </form>
  );
}

export default FormProduct;