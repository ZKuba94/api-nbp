import {Form, Row, Col} from 'react-bootstrap'
import {useEffect, useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Inputs({actCurrency, number, onCurrencyChange, onNumberChange}) {
    const [curr, setCurr] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`/api/exchangerates/tables/A/`)
            setCurr(data[0].rates.map(el => [el.currency, el.code]))
        }
        fetchData()
    }, [])

    const listItems = curr.map(currency =>
        <option key={currency[1]} value={currency[1]}>{currency[1]} - {currency[0]}</option>
    )

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(num) {
            const context = this;
            const later = (num) => {
                clearTimeout(timeout);
                func.call(context, num)
            }
            clearTimeout(timeout)
            timeout = setTimeout(() => later(num), wait)
        }
    }

    const debounceSearch = debounce(function (num) {
        onNumberChange(num)
    }, 300);

    return (
        <Form as={Row}>
            <Form.Group as={Col} sm={6}>
                <Form.Label>Currency</Form.Label>
                <Form.Select
                    value={actCurrency}
                    onChange={(e) => onCurrencyChange(e.target.value)}
                >
                    {listItems}
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col} sm={6}>
                <Form.Label>
                    How many records
                </Form.Label>
                <Form.Control
                    type='number'
                    value={number}
                    onChange={(e) => {debounceSearch(parseFloat(e.target.value))}}
                />
            </Form.Group>
        </Form>
    )
}

Inputs.propTypes = {
    actCurrency: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    onCurrencyChange: PropTypes.func.isRequired,
    onNumberChange: PropTypes.func.isRequired,
}
export default Inputs;