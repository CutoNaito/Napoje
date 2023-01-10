import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function TokenGenerator(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// https://stackoverflow.com/a/15724300
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function Verify() {
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [code, setCode] = React.useState('');
    const [token, setToken] = React.useState(TokenGenerator(24));
    const [error, setError] = React.useState(null);

    const history = useNavigate();

    const fetchData = async (e) => {
        const response = await fetch("/api/verification/" + getCookie("email"));
        const result = await response.json();
        if (result.error) {
            setError(result.error);
        } else {
            setName(result.result[0].name);
            setPassword(result.result[0].password);
            setCode(result.result[0].code);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchData();
        if (code === e.target.code.value) {
            const response = await fetch("/api/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                name: name,
                password: password,
                email: getCookie("email"),
                token: token
                })
            });

            const result = await response.json();

            if (result.error) {
                setError(result.error);
            } else {
                document.cookie = `token=${token}`;
                history('/');
            }
        } else {
            alert("Wrong verification code.");
        }
    };
    return (
        <div>
            <Header />
            <main>
            <h1 className='loginh1'>Verify</h1>
            <form className='loginForm' onSubmit={handleSubmit}>
                <label htmlFor='code'>
                    Verification Code:
                </label>
                <input 
                    type="text" 
                    id="code" 
                    name="code"
                />
                <button>Submit</button>
            </form>
            </main>
            <Footer />
        </div>
    );
}

export default Verify;