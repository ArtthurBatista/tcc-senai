import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './assets/Header/header';
import Cadastro from './assets/Cadastro/cadastro';
import PlanejarViagem from './assets/PlanejarViagem/planejar';
import Home from './assets/Home/home';
import Login from './assets/Login/login';
import Checklist from './assets/Checklist/checklist';
import Dashboard from './assets/Dashboard/dashboard';
import MinhasViagens from './assets/Minhas Viagens/minhas-viagens';
import Gastos from './assets/Gastos/gastos';
import DetalhesViagem from './assets/DetalhesViagem/detalhes';
import './app.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="background"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/planejar" element={<PlanejarViagem />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/minhas-viagens" element={<MinhasViagens />} />
          <Route path="/gastos" element={<Gastos />} />
          
          <Route path="/viagem/:id" element={<DetalhesViagem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
