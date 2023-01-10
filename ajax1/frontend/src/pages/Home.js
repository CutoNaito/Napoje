import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";
import { useNavigate } from "react-router-dom";

// https://stackoverflow.com/a/15724300
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function Home() {
    const [type, setType] = React.useState("");
    const [quantity, setQuantity] = React.useState(0);
    const [userID, setUserID] = React.useState(0);
    const [error, setError] = React.useState("");

    const history = useNavigate();

    React.useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch("/api/users/token/" + getCookie("token"));
            const result = await response.json();
            if (result.error || !getCookie("token")) {
                history("/login");
            } else {
                setUserID(result.result[0].ID);
            }
        }
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const date = new Date();
        console.log(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());

        let i = 0;
        while (i < quantity) {
            const response = await fetch("/api/drinks", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: type,
                    name: userID,
                    date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
                })
            });

            const result = await response.json();

            if (result.error) {
                setError(result.error);
            }
            i++;
        }
        document.cookie = "napoj=" + type;
        document.cookie = "mnozstvi=" + quantity;

    };

        

  return (
    <div className="Home">
        <Header />
        <main>
            <div className="container">
                <div className="form-card">
                    <div className="form-element">
                        <form onSubmit={handleSubmit}>
                            <div className="form-text">
                                <label htmlFor="drink">Vyberte nápoj: </label>
                                <div className="mleko">
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
                                </div>
                                <div className="mnozstvi">
                                <input type="number" name="quantity" placeholder="Množství" defaultValue={getCookie("mnozstvi")} onChange={
                                    (e) => {
                                        setQuantity(e.target.value);
                                    }
                                } />
                                </div>
                            </div>
                            <div className="form-submit">
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
       </main>
        <Footer />
    </div>
  );
}

export default Home;