import { useState } from "react";

const Contact = () => {
  const initialFormState = { name: '', email: '', message: '' };
  const [form, setForm] = useState({...initialFormState});

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:5000/contact', {
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" name="name" id="name" className="form-control" onChange={handleChange} value={form.name} />
      </div>
      <div>
        <label htmlFor="email" className="form-label">Email</label>
        <input type="text" name="email" id="email" className="form-control" onChange={handleChange} value={form.email} />
      </div>
      <div>
        <label htmlFor="message" className="form-label">Message</label>
        <textarea name="message" id="message" className="form-control" onChange={handleChange} value={form.message}></textarea>
      </div>

      <div><input type="submit" value="Envoyer" className="btn btn-info" /></div>
    </form>
  );
}

export default Contact;