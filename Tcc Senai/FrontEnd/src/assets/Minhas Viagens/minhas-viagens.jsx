import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import './minhas-viagens.css';
import EditModal from './EditModal'; 

function MinhasViagens() {
  const [viagens, setViagens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingViagem, setEditingViagem] = useState(null);

  useEffect(() => {
    const viagensSalvas = JSON.parse(localStorage.getItem('viagens')) || [];
    setViagens(viagensSalvas);
  }, []);

  const handleEdit = (e, id) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    const viagemParaEditar = viagens.find((viagem) => viagem.id === id);
    setEditingViagem(viagemParaEditar);
    setIsModalOpen(true);
  };

  const handleDelete = (e, id) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    if (window.confirm('Tem certeza que deseja excluir esta viagem?')) {
      const novasViagens = viagens.filter((viagem) => viagem.id !== id);
      setViagens(novasViagens);
      localStorage.setItem('viagens', JSON.stringify(novasViagens));
    }
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
          
            <Link 
              key={viagem.id} 
              to={`/viagem/${viagem.id}`} 
              state={{ viagem: viagem }} 
              className="viagem-card-link"
            >
              <div className="viagem-card">
                {viagem.imagem && <img src={viagem.imagem} alt={viagem.destino} className="viagem-imagem"/>}
                <h2>{viagem.destino}</h2>
                <p>Data: {viagem.data}</p>
                <p>Status: <span className={`status ${viagem.status.toLowerCase().replace(' ', '-')}`}>{viagem.status}</span></p>
                <div className="card-actions">
                  
                  <button onClick={(e) => handleEdit(e, viagem.id)} className="btn-edit">Editar</button>
                  <button onClick={(e) => handleDelete(e, viagem.id)} className="btn-delete">Excluir</button>
                </div>
              </div>
            </Link>
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
