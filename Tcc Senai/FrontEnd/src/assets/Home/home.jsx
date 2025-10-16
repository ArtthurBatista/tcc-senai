import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; 
import { FaClipboardList, FaPlaneDeparture, FaWallet, FaMapMarkedAlt } from 'react-icons/fa';

// Estrutura dos Cards de Funcionalidade
const featureCards = [
    { 
        title: "Planejamento Rápido", 
        description: "Defina destino, datas e o que importa. Comece sua aventura em segundos.", 
        icon: FaPlaneDeparture,
        route: "/planejar"
    },
    { 
        title: "Checklist Inteligente", 
        description: "Nunca mais esqueça nada! Crie listas personalizadas para cada viagem.", 
        icon: FaClipboardList,
        route: "/checklist" 
    },
    { 
        title: "Controle de Gastos", 
        description: "Monitore suas despesas em tempo real e mantenha o orçamento sob controle.", 
        icon: FaWallet,
        route: "/gastos" 
    },
    { 
        title: "Minhas Rotas", 
        description: "Visualize todas as suas viagens passadas e futuras em um só lugar.", 
        icon: FaMapMarkedAlt,
        route: "/dashboard" 
    },
];

function Home() {
    const navigate = useNavigate();

    const handleNavigate = (route) => {
        navigate(route);
    };

    return (
        <div className="home-container">
            {/* Seção Principal (Hero) */}
            <div className="content hero-card">
                <h1>PLANEJE SUA VIAGEM AQUI</h1>
                <p>Tudo da sua viagem, organizado como deveria ser. Do passaporte ao protetor solar.</p>
                <button onClick={() => handleNavigate('/planejar')}>
                    Planejar minha viagem
                </button>
            </div>

            {/* Seção de Cards - Recursos Essenciais */}
            <div className="features-section">
                <h2>Recursos Essenciais para o Viajante Moderno</h2>
                <div className="features-grid">
                    {featureCards.map((card, index) => (
                        <div 
                            key={index} 
                            className="glass-card feature-card" 
                            onClick={() => handleNavigate(card.route)}
                        >
                            <card.icon className="feature-icon" /> 
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            <span className="card-action">Ver Detalhes »</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Seção de Chamada para Ação (CTA) */}
            <div className="content cta-card">
                <h2>Pronto para a Próxima Aventura?</h2>
                <button onClick={() => handleNavigate('/login')} className="cta-button">
                    Entrar e Organizar
                </button>
            </div>
        </div>
    );
}

export default Home;