import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; 

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/planejar');
  };

  return (
    <div className="content">
      <h1>PLANEJE SUA VIAGEM AQUI</h1>
      <p>Tudo da sua viagem, organizado como deveria ser.</p>
      <button onClick={handleClick}>Planejar minha viagem</button>
    </div>
  );
}

export default Home;
