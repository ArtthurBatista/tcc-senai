import React, { useState } from 'react';
import './planejar.css';

function PlanejarViagem() {
  const [formData, setFormData] = useState({
    destino: '',
    data: '',
    pessoas: 1,
    orcamento: '',
    tipo: '',
    transporte: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Destino: ${formData.destino}\n` +
      `Data: ${formData.data}\n` +
      `Número de pessoas: ${formData.pessoas}\n` +
      `Orçamento: ${formData.orcamento}\n` +
      `Tipo de viagem: ${formData.tipo}\n` +
      `Transporte: ${formData.transporte}`
    );
  };

  return (
    <div className="planejar-viagem-container">
      <h1>Planejar Viagem</h1>
      <form className="planejar-form" onSubmit={handleSubmit}>
        <label>
          Destino:
          <input type="text" name="destino" value={formData.destino} onChange={handleChange} required />
        </label>

        <label>
          Data da Viagem:
          <input type="date" name="data" value={formData.data} onChange={handleChange} required />
        </label>

        <label>
          Número de Pessoas:
          <input type="number" name="pessoas" value={formData.pessoas} onChange={handleChange} min="1" required />
        </label>

        <label>
          Orçamento:
          <input type="text" name="orcamento" value={formData.orcamento} onChange={handleChange} required />
        </label>

        <label>
          Tipo de Viagem:
          <select name="tipo" value={formData.tipo} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="Lazer">Lazer</option>
            <option value="Negócios">Negócios</option>
            <option value="Aventura">Aventura</option>
            <option value="Cultural">Cultural</option>
          </select>
        </label>

        <label>
          Meio de Transporte:
          <select name="transporte" value={formData.transporte} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="Avião">Avião</option>
            <option value="Carro">Carro</option>
            <option value="Ônibus">Ônibus</option>
            <option value="Trem">Trem</option>
          </select>
        </label>

        <button type="submit">Planejar Viagem</button>
      </form>
    </div>
  );
}

export default PlanejarViagem;