import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import Inputs from './Inputs'
import CurrencyList from './CurrencyList'
import {useState} from "react";
function App() {
    const [currency, setCurrency] = useState('')
    const [number, setNumber] = useState(0)
    const [table,setTable] = useState([])
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
                actCurrency={currency}
                number={number}
                table={table}
                onTableChange={setTable}
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
