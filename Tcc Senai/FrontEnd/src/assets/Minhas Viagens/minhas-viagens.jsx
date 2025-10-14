import React, { useEffect, useState } from 'react';
import './minhas-viagens.css';

function MinhasViagens() {
  const [viagens, setViagens] = useState([]);

  useEffect(() => {
    const viagensSalvas = JSON.parse(localStorage.getItem('viagens')) || [];
    setViagens(viagensSalvas);
  }, []);

  return (
    <div className="minhas-viagens-container">
      <h1>Minhas Viagens</h1>
      <div className="viagens-grid">
        {viagens.map((viagem) => (
          <div key={viagem.id} className="viagem-card">
            <h2>{viagem.destino}</h2>
            <p>Data: {viagem.data}</p>
            <p>Status: <span className={`status ${viagem.status.toLowerCase().replace(' ', '-')}`}>{viagem.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MinhasViagens;
