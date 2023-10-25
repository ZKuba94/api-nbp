import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import Inputs from './Inputs'
import CurrencyList from './CurrencyList'
import {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
    const [currFromUrl, numberFromUrl] =
        [((window.location.pathname).slice(1, 4)).toUpperCase(),
            parseFloat((window.location.pathname).slice(5))]
    const [currency, setCurrency] = useState(currFromUrl || 'EUR')
    const [number, setNumber] = useState(numberFromUrl || 10)
    return (
        <Router>
            <div className="App">
                <Header/>
                <Inputs
                    actCurrency={currFromUrl || currency}
                    actNumber={numberFromUrl || number}
                    onCurrencyChange={setCurrency}
                    onNumberChange={setNumber}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <CurrencyList
                                actCurrency={'EUR'}
                                actNumber={10}
                            />
                        }
                    />
                    <Route
                        index
                        path="/:actCurrency/:actNumber"
                        element={
                            <CurrencyList
                                actCurrency={currFromUrl || currency}
                                actNumber={numberFromUrl || number}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;