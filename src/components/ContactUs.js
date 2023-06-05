import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, email, message });
    history.push('/success');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Message:
        <textarea value={message} onChange={e => setMessage(e.target.value)} required />
      </label>
      <input type="submit" value="Send" />
    </form>
  );
};

export default ContactUs;
