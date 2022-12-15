import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="Home">
        <Header />
        <main>
            <div className="container">
                <div className="form-card">
                    <div className="form-element">
                        <form action="/api/napoje" method="POST">
                            <div className="form-text">
                                <label htmlFor="mleko">Mleko</label>
                                <input type="text" id="mleko" name="mleko" />
                                <label htmlFor="espresso">Espresso</label>
                                <input type="text" id="espresso" name="espresso" />
                                <label htmlFor="coffe">Coffe</label>
                                <input type="text" id="coffe" name="coffe" />
                                <label htmlFor="long">Long</label>
                                <input type="text" id="long" name="long" />
                                <label htmlFor="doppio+">Doppio+</label>
                                <input type="text" id="doppio+" name="doppio+" />
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