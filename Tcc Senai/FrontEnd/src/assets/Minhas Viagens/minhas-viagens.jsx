import React, { useEffect, useState } from 'react';
import './minhas-viagens.css';
import EditModal from './EditModal'; // Vamos criar este componente a seguir

function MinhasViagens() {
  const [viagens, setViagens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingViagem, setEditingViagem] = useState(null);

  useEffect(() => {
    const viagensSalvas = JSON.parse(localStorage.getItem('viagens')) || [];
    setViagens(viagensSalvas);
  }, []);

  const handleEdit = (id) => {
    const viagemParaEditar = viagens.find((viagem) => viagem.id === id);
    setEditingViagem(viagemParaEditar);
    setIsModalOpen(true);
  };

  const handleUpdateViagem = (viagemAtualizada) => {
    const novasViagens = viagens.map((viagem) =>
      viagem.id === viagemAtualizada.id ? viagemAtualizada : viagem
    );
    setViagens(novasViagens);
    localStorage.setItem('viagens', JSON.stringify(novasViagens));
    setIsModalOpen(false);
    setEditingViagem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta viagem?')) {
      const novasViagens = viagens.filter((viagem) => viagem.id !== id);
      setViagens(novasViagens);
      localStorage.setItem('viagens', JSON.stringify(novasViagens));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingViagem(null);
  };

  return (
    <div className="minhas-viagens-container">
      <h1>Minhas Viagens</h1>
      <div className="viagens-grid">
        {viagens.length === 0 ? (
          <p>Nenhuma viagem encontrada.</p>
        ) : (
          viagens.map((viagem) => (
            <div key={viagem.id} className="viagem-card">
              {viagem.imagem && <img src={viagem.imagem} alt={viagem.destino} className="viagem-imagem"/>}
              <h2>{viagem.destino}</h2>
              <p>Data: {viagem.data}</p>
              <p>Status: <span className={`status ${viagem.status.toLowerCase().replace(' ', '-')}`}>{viagem.status}</span></p>
              <div className="card-actions">
                <button onClick={() => handleEdit(viagem.id)} className="btn-edit">Editar</button>
                <button onClick={() => handleDelete(viagem.id)} className="btn-delete">Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
      {isModalOpen && (
        <EditModal
          viagem={editingViagem}
          onSave={handleUpdateViagem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default MinhasViagens;
