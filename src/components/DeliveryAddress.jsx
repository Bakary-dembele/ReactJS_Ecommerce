import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeliveryAddress = () => {
  const navigate = useNavigate();

  const initialFormState = localStorage.getItem('delivery-address') ?
    JSON.parse(localStorage.getItem('delivery-address')) : { name: '', address: '' };

  const [form, setForm] = useState({ ...initialFormState });

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('delivery-address', JSON.stringify(form));

    navigate('/payment');
  }

  const handleChange = (event) => {
    const newData = { ...form };
    newData[event.target.name] = event.target.value;

    setForm(newData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" name="name" id="name" className="form-control" onChange={handleChange} value={form.name} />
      </div>
      <div>
        <label htmlFor="address" className="form-label">Address</label>
        <input type="text" name="address" id="address" className="form-control" onChange={handleChange} value={form.address} />
      </div>

      <div><input type="submit" value="Passer au paiement" className="btn btn-success" /></div>
    </form>
  );
}

export default DeliveryAddress;