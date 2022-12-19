import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// https://stackoverflow.com/a/15724300
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function Profile () {
    const [token] = useState(getCookie('token'));
    const [username, setUsername] = useState('');
    const history = useNavigate();

    useEffect(() => {
        if (!token) {
            history('/login');
        }

        const fetchUser = async () => {
            const response = await fetch('/api/users/token/' + token);

            const data = await response.json();

            if (data.error) {
                history('/login');
            } else {
                setUsername(data.result[0].name);
            }
        }

        fetchUser();

        const fetchDrinks = async () => {
            const response = await fetch('/api/drinks/name/' + data.result[0].id);

            const data = await response.json();

            console.log(data);
        }
    }, []);

    return (
        <div>
            <h1>{username}</h1>
        </div>
    )
}