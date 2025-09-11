import React, { useState } from 'react';
import '../PlanejarViagem/inputForm.css';

function InputForm() {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Destino: ${destination}, Data: ${date}`);
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Para onde você vai?"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Quando?"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Continuar →</button>
    </form>
  );
}

export default InputForm;
