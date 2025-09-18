import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <a href='/' ><img src="/images/LogoB.png" alt="Viajante+"/></a> 
      </div>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/minhas-viagens">Minhas Viagens</Link></li>
          <li><a href="">Gastos</a></li>
          <li><Link to="/checklist">Checklist</Link></li>
          <li className="entrar"><Link to="/login">Entrar</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
