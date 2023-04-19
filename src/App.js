import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import Inputs from './Inputs'
import CurrencyList from './CurrencyList'
import {useState} from "react";

function App() {
    const [currency, setCurrency] = useState('EUR')
    const [number, setNumber] = useState(10)
    return (
        <div className="App">
            <Header/>
            <Inputs
                actCurrency={currency}
                number={number}
                onCurrencyChange={setCurrency}
                onNumberChange={setNumber}
            />
            <CurrencyList
                number={number}
                actCurrency={currency}
            />
        </div>
    );
}

export default App;
