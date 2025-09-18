import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const receitaData = [
    { ano: 2021, valor: 5.3 },
    { ano: 2022, valor: 10.4 },
    { ano: 2023, valor: 14.0 },
    { ano: 2024, valor: 4.4 },
  ];

  const canaisData = [
    { name: "Presencial", value: 39.9 },
    { name: "Online", value: 41. },
    { name: "Telefone", value: 19 },
  ];

  const receitaPais = [
    { pais: "Brasil", valor: 91.39 },
    { pais: "EUA", valor: 20.5 },
    { pais: "França", valor: 10.8 },
  ];

  const destinosAno = [
    { destino: "Lençóis", 2021: 228, 2022: 546, 2023: 403, 2024: 184 },
    { destino: "Maceió", 2021: 300, 2022: 622, 2023: 534, 2024: 176 },
    { destino: "Jericoacoara", 2021: 198, 2022: 442, 2023: 390, 2024: 108 },
    { destino: "Porto de Galinhas", 2021: 136, 2022: 362, 2023: 342, 2024: 181 },
  ];

  const COLORS = ["#f83600", "#f8d800", "#007bff"];

 
  const renderBar = (value, max) => {
    const widthPercent = (value / max) * 100;
    return (
      <div className="bar-bg">
        <div className="bar-fill" style={{ width: `${widthPercent}%` }}></div>
      </div>
    );
  };

  const maxReceita = Math.max(...receitaData.map(d => d.valor));
  const maxPais = Math.max(...receitaPais.map(d => d.valor));

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Controle de Viagens ✈️</h1>
        <p>Bem-vindo de volta, <strong>Usuario</strong></p>
        <div className="kpis">
          <div className="kpi-card receita">
            <h2>Receita</h2>
            <p>R$ 91.39 M</p>
          </div>
          <div className="kpi-card passageiros">
            <h2>Passageiros</h2>
            <p>56 K</p>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="dashboard-content">

        {/* Receita por período */}
        <div className="glass-card">
          <h2>Receita por período</h2>
          {receitaData.map((d, i) => (
            <div key={i} className="chart-item">
              <span>{d.ano}</span>
              {renderBar(d.valor, maxReceita)}
              <span>{d.valor} M</span>
            </div>
          ))}
        </div>

        {/* Representatividade por canal */}
        <div className="glass-card">
          <h2>Representatividade por canal</h2>
          <div className="pie-container">
            {canaisData.map((c, i) => (
              <div key={i} className="pie-segment">
                <div
                  className="pie-color"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                ></div>
                <span>{c.name}: {c.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Receita por país */}
        <div className="glass-card">
          <h2>Receita por País</h2>
          {receitaPais.map((p, i) => (
            <div key={i} className="chart-item">
              <span>{p.pais}</span>
              {renderBar(p.valor, maxPais)}
              <span>{p.valor} M</span>
            </div>
          ))}
        </div>

        {/* Tabela de destinos */}
        <div className="glass-card">
          <h2>Viagens por Destino e Ano</h2>
          <table>
            <thead>
              <tr>
                <th>Destino</th>
                <th>2021</th>
                <th>2022</th>
                <th>2023</th>
                <th>2024</th>
              </tr>
            </thead>
            <tbody>
              {destinosAno.map((row, i) => (
                <tr key={i}>
                  <td>{row.destino}</td>
                  <td>{row[2021]}</td>
                  <td>{row[2022]}</td>
                  <td>{row[2023]}</td>
                  <td>{row[2024]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
