import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// https://stackoverflow.com/a/15724300
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function Profile () {
    const [token] = useState(getCookie('token'));
    const [username, setUsername] = useState('');
    const [id, setID] = useState('');
    const [result, setResult] = useState([]);
    const [coffeCount, setCoffeCount] = useState(0);
    const [doppioCount, setDoppioCount] = useState(0);
    const [espressoCount, setEspressoCount] = useState(0);
    const [mlekoCount, setMlekoCount] = useState(0);
    const [longCount, setLongCount] = useState(0);
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
                setID(data.result[0].ID);
            }
        }

        fetchUser();

        const fetchDrinks = async () => {
            const response = await fetch('/api/drinks/name/' + id + '/month/10');

            const data = await response.json();

            if (data.error) {
                history('/login');
            } else {
                setResult(data.result);
            }

            result.forEach(type => {
                if (type.typ === 'Coffe') {
                    setCoffeCount(type['COUNT(typ)']);
                }
                if (type.typ === 'Doppio+') {
                    setDoppioCount(type['COUNT(typ)']);
                }
                if (type.typ === 'Espresso') {
                    setEspressoCount(type['COUNT(typ)']);
                }
                if (type.typ === 'Mléko') {
                    setMlekoCount(type['COUNT(typ)']);
                }
                if (type.typ === 'Long') {
                    setLongCount(type['COUNT(typ)']);
                }
            });
        }

        fetchDrinks();
    }, []);

    return (
        <div>
            <Header />
            <h1>{username}</h1>
            <table className="profileTable">
                <tr>
                    <th>Drink</th>
                    <th>Count</th>
                </tr>
                <tr>
                    <td>Coffe</td>
                    <td>{coffeCount}</td>
                </tr>
                <tr>
                    <td>Doppio+</td>
                    <td>{doppioCount}</td>
                </tr>
                <tr>
                    <td>Espresso</td>
                    <td>{espressoCount}</td>
                </tr>
                <tr>
                    <td>Mleko</td>
                    <td>{mlekoCount}</td>
                </tr>
                <tr>
                    <td>Long</td>
                    <td>{longCount}</td>
                </tr>
            </table>
            <Footer />
        </div>
    )
}

export default Profile;