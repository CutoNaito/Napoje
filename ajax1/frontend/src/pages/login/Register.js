import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

function VerificationCodeGenerator(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function Register() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState(null);
    const [verificationCode] = React.useState(VerificationCodeGenerator(24));

    const history = useNavigate();

    const handleSubmit = async (e) => {
        if (password.length < 8) {
            alert("Password must be atleast 8 characters long.");
        }

        let code = verificationCode;
        e.preventDefault();
        const response = await fetch("/api/smtp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                code: code
            })
        });

        const result = await response.json();

        if (result.error) {
            setError(result.error);
        } else {
            const response = await fetch("/api/verification", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    password: password,
                    code: code
                })
            });

            const result = await response.json();

            if (result.error) {
                setError(result.error);
            } else {
                document.cookie = `email=${email}`;
                history('/verify');
            }
        }
    };

    return (
        <div>
            <Header />
            <main>
            <h1 className='loginh1'>Register</h1>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label form="username">Username</label>
                <input
                    type="text"
                    name="username" 
                    id="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <label form="email">Email</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <label form="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button id='register'>Register</button>
            </form>
            </main>
            <Footer />
        </div>
    )
};

export default Register;