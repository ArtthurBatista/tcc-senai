import React from 'react';
import InputForm from './InputForm';
import './planejar.css';

function Planejar() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Viagem+</h1>
        <p>Convide seus amigos e planeje sua próxima viagem!</p>
        <InputForm />
        <p className="terms">
          Ao planejar sua viagem pelo <strong>Viagem+</strong> você automaticamente concorda com nossos{' '}
          <a href="">termos de uso</a> e <a href="">políticas de privacidade</a>
        </p>
      </div>
    </div>
  );
}

export default Planejar;
