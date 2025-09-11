import React from 'react';
import './cadastro.css';
import { Link, useNavigate } from 'react-router-dom';


function Cadastro() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    async function handleCadastro(e) {
        e.preventDefault(); 
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name,
                    email: email,
                }
            }
        });

        if (error) {
            console.log("Resultado cadastro:", { data, error });
            alert('Erro ao cadastrar: ' + error.message);
            setLoading(false);
            return;
        } else {
            alert('Usuário cadastrado com sucesso! Agora você pode realizar seu login.');
            setLoading(false);
            navigate('/login');
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
