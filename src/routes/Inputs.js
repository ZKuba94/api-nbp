import {Form, Row, Col} from 'react-bootstrap'
import {useEffect, useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {useNavigate} from 'react-router-dom'

export function Inputs({actCurrency, actNumber, onCurrencyChange, onNumberChange, onErrorChange, onErrorVariantChange}) {
    const [currencies, setCurrencies] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                // setLoading(true)
                const {data} = await axios.get(`/api/exchangerates/tables/A`)
                setCurrencies(data[0].rates.map(el => ({'name':el.currency, code: el.code})))
                setLoading(false)
            } catch (error) {
                onErrorChange(error.message)
                onErrorVariantChange('danger')
                navigate(`/error`)
            } finally {
                // setLoading(false)
            }

        }
        fetchData()
    }, [navigate,actCurrency,actNumber])
    const listItems = currencies.map(currency =>
        <option key={currency.code} value={currency['code']}>{currency.code} - {currency.name}</option>
    )
    // console.log({loading:loading})
    // console.log({loading})
    return (
        <Form
            as={Row}
            id="search-form"
            role="search"
            className='mx-0'
        >
            <Form.Group as={Col}>
                    <Form.Label>Currency {loading && 'loading...'}</Form.Label>
                    <Form.Select
                        name="currencies"
                        value={actCurrency}
                        // onInput={}
                        onChange={(e) => {
                            onCurrencyChange(e.target.value)
                            navigate(`/${e.target.value}/${actNumber}`)
                        }}
                    >
                        {listItems}
                    </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>
                    How many records
                </Form.Label>
                <Form.Control
                    name="count"
                    type="number"
                    min={1}
                    max={255}
                    inputMode='decimal'
                    step={1}
                    value={actNumber}
                    onChange={(e) => {
                        onNumberChange(parseFloat(e.target.value))
                        navigate(`/${actCurrency}/${+e.target.value}`)
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