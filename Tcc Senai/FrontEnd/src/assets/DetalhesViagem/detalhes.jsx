import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './detalhes.css';

function DetalhesViagem() {
  const { id } = useParams(); 
  
 
  const location = useLocation();
  const { viagem } = location.state || {};

  if (!viagem) {
    return <div>Viagem não encontrada.</div>;
  }

  return (
    <div className="trip-details-container">
      <h1>{viagem.destino}</h1>
      <p>Data: {viagem.data}</p>
      <p>Status: {viagem.status}</p>
      {viagem.imagem && <img src={viagem.imagem} alt={viagem.destino} className="trip-image" />}
      
      <hr />

      <h2>Checklist da Viagem</h2>
      <p>// Seu componente de checklist para a viagem com id {id} vai aqui.</p>

    </div>
  );
}

export default DetalhesViagem;