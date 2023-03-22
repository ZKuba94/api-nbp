import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Record from './Record'

function CurrencyList({currencies,actCurrency,number}) {

    return (
        <Container className='d-flex justify-content-center'>
            <Row className='justify-content-center mt-3 w-50'>
                <Record currencies={currencies}
                        currency={actCurrency}
                        number={number}/>
            </Row>
        </Container>
    )
}

export default CurrencyList;