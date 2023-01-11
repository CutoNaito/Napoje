import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// https://stackoverflow.com/a/15724300
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function Admin() {
    const [username, setUsername] = React.useState(0);
    const [person, setPerson] = React.useState('');
    const [type, setType] = React.useState(0);
    const [quantity, setQuantity] = React.useState(0);
    const [error, setError] = React.useState('');
    const history = useNavigate();

    React.useEffect(() => {
        if (getCookie('token') === undefined) {
            history('/');
        }
        const fetchUser = async () => {
            const user = await fetch('/api/users/token/' + getCookie('token'));
            const result = await user.json();
            if (result.error || result.result.admin === 0) {
                history('/');
            } else {
                console.log(result);
                setUsername(result.result[0].name);
            }
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const date = new Date();
        const response = await fetch("/api/drinks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: person,
                type: type,
                date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
            })
        });
        const result = await response.json();

        if (result.error) {
            setError(result.error);
        }
    };
    return (
        <div>
            <Header />
            <main>
            <h1>Admin</h1>
            <p>Username: {username}</p>
            <form onSubmit={handleSubmit}>
                <label for="person">Person</label>
                <input type="text" id="username" name="username" onChange={
                    (e) => {
                        setPerson(e.target.value);
                    }
                } />
                <select name="drink" defaultValue={getCookie("napoj")} onChange={
                    (e) => {
                        setType(e.target.value);
                    }
                }>
                    <option value="1">Mléko</option>
                    <option value="2">Espresso</option>
                    <option value="3">Coffe</option>
                    <option value="4">Long</option>
                    <option value="5">Doppio+</option>
                </select>
                <input type="number" name="quantity" placeholder="Množství" defaultValue={getCookie("mnozstvi")} onChange={
                    (e) => {
                        setQuantity(e.target.value);
                    }
                } />
                <div className="form-submit">
                    <button type="submit">Submit</button>
                </div>
            </form>
            </main>
            <Footer />
        </div>
    );
};

export default Admin;