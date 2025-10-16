import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './detalhes.css';
import CheckList from '../Checklist/Checklist'; // Verifique o caminho correto

function DetalhesViagem() {
  const { id } = useParams(); // 'id' é o ID ÚNICO da viagem
  const location = useLocation();
  // Assume que 'viagem' contém os dados da viagem (destino, data, etc.)
  const { viagem } = location.state || {}; 

  if (!viagem) {
    return (
      <div className="trip-details-container">
        <h1>Viagem não encontrada.</h1>
        <p>Verifique o link ou se os dados foram passados corretamente.</p>
      </div>
    );
  }

  return (
    <div className="trip-details-container">
      <h1>{viagem.destino}</h1>
      <p>Data: {viagem.data}</p>
      <p>Status: {viagem.status}</p>
      {viagem.imagem && <img src={viagem.imagem} alt={viagem.destino} className="trip-image" />}

      <hr />

      <h2>Checklist da Viagem</h2>
      {/* PASSANDO A ID DA VIAGEM PARA O CHECKLIST */}
      <CheckList viagemId={id} />
    </div>
  );
}

export default DetalhesViagem;