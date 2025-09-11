import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';

function Login() {
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
                    <a href="#">Esqueceu a senha?</a>
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
