import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Inputs({currencies, actCurrency, number, onCurrencyChange, onNumberChange}) {
    const listItems = currencies.map(currency =>
        <option key={currency.key} value={currency.key}>{currency.key}</option>
    )
    return (
        <>
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
        </>
    )
}

export default Inputs;