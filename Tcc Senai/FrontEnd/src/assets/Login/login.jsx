import React, { useEffect } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

function Login() {
    useEffect(() => {
        document.body.classList.add('login-page-body');
        
        // Função de limpeza para remover a classe quando o componente for desmontado
        return () => {
            document.body.classList.remove('login-page-body');
        };
    }, []); // O array vazio garante que isso rode apenas uma vez (montagem/desmontagem)

    return (
        <div className="glass-container">
            <h2>Login</h2>
            <form>
                <div className="input-group">
                    <input type="text" required />
                    <label>Username</label>
                </div>

                <div className="input-group">
                    <input type="password" required />
                    <label>Senha</label>
                </div>

                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> Lembrar Senha
                    </label>
                    <a href="">Esqueceu a senha?</a>
                </div>

                <button type="submit" className="login-btn">Login</button>

                <div className="register-link">
                    <p>
                        Não tem conta? <a><Link to="/cadastro">Registrar</Link></a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;