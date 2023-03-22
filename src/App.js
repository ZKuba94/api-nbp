import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import Inputs from './Inputs'
import CurrencyList from './CurrencyList'
import {useState} from "react";
function App() {
    const [currency, setCurrency] = useState('')
    const [number, setNumber] = useState(0)
    return (
        <div className="App">
            <Header/>
            <Inputs
                currencies={currencies}
                actCurrency={currency}
                number={number}
                onCurrencyChange={setCurrency}
                onNumberChange={setNumber}
            />
            <CurrencyList
                currencies={currencies}
                actCurrency={currency}
                number={number}
                onCurrencyChange={setCurrency}
                onNumberChange={setNumber}
            />
        </div>
    );
}

const currencies = [
    {key: 'EUR'},
    {key: 'USD'},
    {key: 'BTH'},
    {key: 'HUF'}
]
export default App;
