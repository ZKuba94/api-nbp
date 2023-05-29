import {Form, Row, Col} from 'react-bootstrap'
import {useEffect, useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {useNavigate} from 'react-router-dom'

export function Inputs({actCurrency, actNumber, onCurrencyChange, onNumberChange}) {
    const [currencies, setCurrencies] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`/api/exchangerates/tables/A`)
            setCurrencies(data[0].rates.map(el => [el.currency, el.code]))
        }
        fetchData()
    }, [navigate])
    const listItems = currencies.map(currency =>
        <option key={currency[1]} value={currency[1]}>{currency[1]} - {currency[0]}</option>
    )

    // function debounce(func, wait) {
    //     let timeout;
    //     return function executedFunction(num) {
    //         const context = this;
    //         const later = (num) => {
    //             clearTimeout(timeout);
    //             func.call(context, num)
    //         }
    //         clearTimeout(timeout)
    //         timeout = setTimeout(() => later(num), wait)
    //     }
    // }
    //
    // const debounceSearch = debounce((number) => {
    //     onNumberChange(number)
    // }, 300)

    return (
        <Form
            as={Row}
            id="search-form"
            role="search"
        >
            <Form.Group as={Col} sm={6}>
                <Form.Label>Currency</Form.Label>
                <Form.Select
                    name="currencies"
                    value={actCurrency}
                    onChange={(e) => {
                        onCurrencyChange(e.target.value)
                        navigate(`/${e.target.value}/${actNumber}`)
                    }}
                >
                    {listItems}
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col} sm={6}>
                <Form.Label>
                    How many records
                </Form.Label>
                <Form.Control
                    name="count"
                    type="number"
                    value={actNumber}
                    onChange={(e) => {
                        // debounceSearch(parseFloat(e.target.value))
                        onNumberChange(parseFloat(e.target.value))
                        navigate(`/${actCurrency}/${parseFloat(e.target.value)}`)
                    }}
                />
            </Form.Group>
        </Form>
    )
}

Inputs.propTypes = {
    actCurrency: PropTypes.string.isRequired,
    actNumber: PropTypes.number.isRequired,
    onCurrencyChange: PropTypes.func.isRequired,
    onNumberChange: PropTypes.func.isRequired,
}
export default Inputs;