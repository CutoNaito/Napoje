import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const result = await response.json();
        
        if (!result.error && result.match) {
            console.log(result.match);
            document.cookie = `token=${result.result[0].token}`;
            history('/');
        } else {
            result.error = 'Invalid email or password';
            console.log(result.match);
        }
    }

return (
    <div>
        <Header />
        <main>
        <h1 className='loginh1'>Login</h1>
        <form onSubmit={handleSubmit} className="loginForm">
            <label htmlFor='email'>
                Email:
            </label>
            <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='password'>
                Password:
            </label>
            <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>Submit</button>
        </form>
        </main>
        <Footer />
    </div>
)};

export default Login;