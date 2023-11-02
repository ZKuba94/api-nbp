import {Form, Row, Col} from 'react-bootstrap'
import {useEffect, useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {useNavigate} from 'react-router-dom'

export function Inputs({
                           actCurrency,
                           actNumber,
                           onCurrencyChange,
                           onNumberChange,
                           onErrorChange,
                           onErrorVariantChange,
                           currencyFromUrl,
                           numberFromUrl,
                       }) {
    const [currencies, setCurrencies] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`/api/exchangerates/tables/A`)
                setCurrencies(data[0].rates.map(el => ({'name': el.currency, code: el.code})))
                const curr = (data[0].rates.map(el => ({'name': el.currency, code: el.code}))).map(el => el.code)
                if (!curr.includes(actCurrency || currencyFromUrl)) {
                    onErrorChange(`Please select currency from the list above or insert it in international 
                    format, e.g. 'AUD', 'USD', 'EUR', etc.`)
                    onErrorVariantChange('warning')
                    navigate(`/error`)
                } else if (Number.isNaN(actNumber)) {
                    onErrorChange(`Please insert number in range 1-255.`)
                    onErrorVariantChange('secondary')
                    navigate(`/${actCurrency}`)
                }
            } catch (error) {
                onErrorChange(`Cannot get the resources because of incorrect reference. ${error.message}`)
                onErrorVariantChange('danger')
                navigate(`/error`)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [navigate, actCurrency, actNumber, currencyFromUrl, numberFromUrl])
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
                    placeholder='Select currency'
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
    onErrorChange: PropTypes.func.isRequired,
    onErrorVariantChange: PropTypes.func.isRequired,
    currencyFromUrl: PropTypes.string.isRequired,
    numberFromUrl: PropTypes.number.isRequired,
}
export default Inputs;