import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import Inputs from './Inputs'
import CurrencyList from './CurrencyList'
import {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ErrorHandler from "./ErrorHandler";

function App() {
    const [currFromUrl, numberFromUrl] =
        [((window.location.pathname).slice(1, 4)).toUpperCase(),
            // Number((window.location.pathname).slice(5))]
            ((window.location.pathname).slice(5))]
    const [currency, setCurrency] = useState(currFromUrl || 'EUR')
    // const [number, setNumber] = useState(numberFromUrl || 10)
    const [number, setNumber] = useState(((numberFromUrl === '') ? 10 : Number(numberFromUrl)))
    const [errorMessage, setErrorMessage] = useState('')
    const [errorVariant, setErrorVariant] = useState('')
    return (
        <Router>
            <div className="App">
                <Header/>
                <Inputs
                    actCurrency={currency || currFromUrl}
                    // actNumber={numberFromUrl || number}
                    actNumber={number}
                    // actNumber={(Number(numberFromUrl) || number)}
                    onCurrencyChange={setCurrency}
                    onNumberChange={setNumber}
                    onErrorChange={setErrorMessage}
                    onErrorVariantChange={setErrorVariant}
                    currencyFromUrl={currFromUrl}
                    numberFromUrl={numberFromUrl}
                />
                <Routes>
                    <Route
                        index
                        path="/"
                        element={(
                                errorMessage &&
                                errorVariant &&
                                <ErrorHandler
                                    errorMessage={errorMessage}
                                    errorVariant={errorVariant}
                                />) ||
                            <CurrencyList
                                actCurrency={'EUR'}
                                actNumber={10}
                                onErrorChange={setErrorMessage}
                                onErrorVariantChange={setErrorVariant}
                                onNumberChange={setNumber}
                            />}
                    />
                    <Route
                        path="/error"
                        element={
                            errorMessage &&
                            errorVariant &&
                            <ErrorHandler
                                errorMessage={errorMessage}
                                errorVariant={errorVariant}
                            />
                        }
                    />
                    <Route
                        path="/:actCurrency"
                        element={(
                                errorMessage &&
                                errorVariant &&
                                <ErrorHandler
                                    errorMessage={errorMessage}
                                    errorVariant={errorVariant}
                                />) ||
                            <CurrencyList
                                actCurrency={currFromUrl || currency}
                                // actNumber={numberFromUrl || number}
                                actNumber={Number(numberFromUrl) || number}
                                onErrorChange={setErrorMessage}
                                onErrorVariantChange={setErrorVariant}
                                onNumberChange={setNumber}
                            />

                        }
                    />
                    <Route
                        path="/:actCurrency/:actNumber"
                        element={
                            <CurrencyList
                                actCurrency={currFromUrl || currency}
                                // actNumber={numberFromUrl || number}
                                actNumber={Number(numberFromUrl) || number}
                                onErrorChange={setErrorMessage}
                                onErrorVariantChange={setErrorVariant}
                                onNumberChange={setNumber}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    )
}

export default App;