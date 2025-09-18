import React, { useState } from 'react';
import './minhas-viagens.css';

function MinhasViagens() {
  const [viagens, setViagens] = useState([
    { id: 1, destino: 'Paris', data: '2025-12-01', status: 'Planejada' },
    { id: 2, destino: 'Tokyo', data: '2026-03-15', status: 'Concluída' },
    { id: 3, destino: 'Rio de Janeiro', data: '2025-10-10', status: 'Em andamento' },
  ]);

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
