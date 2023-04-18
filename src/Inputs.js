import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useEffect, useState} from "react";
import axios from "axios";
// import {currencies} from "./currencies";

function Inputs({actCurrency, number, onCurrencyChange, onNumberChange}) {
    // new thing
    const [curr, setCurr] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`http://api.nbp.pl/api/exchangerates/tables/A/`)
            setCurr(data[0].rates.map(el => [el.currency, el.code]))
        }
        fetchData()
    }, [])

    const listItems = curr.map(currency =>
        <option key={currency[1]} value={currency[1]}>{currency[1]} - {currency[0]}</option>
    )
    return (
        <Form as={Row}>
            <Form.Group as={Col} sm={6}>
                <Form.Label>Currency</Form.Label>
                <Form.Select value={actCurrency}
                             onChange={(e) => onCurrencyChange(e.target.value)}>{listItems}</Form.Select>
            </Form.Group>
            <Form.Group as={Col} sm={6}>
                <Form.Label>How many records</Form.Label>
                <Form.Control type='number' value={number} onChange={(e) => onNumberChange(e.target.value)}/>
            </Form.Group>
        </Form>
    )
}

export default Inputs;