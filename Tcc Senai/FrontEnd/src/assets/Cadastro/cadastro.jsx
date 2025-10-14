import React, { useState } from 'react';
import './cadastro.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cadastro() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleCadastro(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/api/users/register', {
                nome: name,
                email: email,
                senha: password
            });

            alert(response.data.message); // Mensagem do servidor
            setLoading(false);
            navigate('/login'); // Redireciona para a tela de login
        } catch (error) {
            console.error('Erro no cadastro:', error);
            alert(
                error.response?.data?.error || 'Erro ao cadastrar. Verifique os dados e tente novamente.'
            );
            setLoading(false);
        }
    }

    return (
        <div className="glass-container">
            <h2>Cadastre-se</h2>
            <form onSubmit={handleCadastro}>
                <div className="input-group">
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
                    <label>Username</label>
                </div>

                <div className="input-group">
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <label>Email</label>
                </div>

                <div className="input-group">
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <label>Senha</label>
                </div>

                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> Lembrar Senha
                    </label>
                    <a href="#">Esqueceu a senha?</a>
                </div>

                <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastre-se'}
                </button>

                <div className="register-link">
                    <p>
                        Já tem conta? <Link to="/login">Entrar</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Cadastro;
