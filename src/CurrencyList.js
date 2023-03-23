import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Record from './Record'
import {useEffect} from "react";
function CurrencyList({actCurrency, number, table,onTableChange}) {
    useEffect(() => {
        fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${actCurrency}/last/${number}/`)
            .then(data => data.json()).then(list => onTableChange(list.rates))
    }, [actCurrency,number])
    console.log(table)
    return (
        <Container className='d-flex justify-content-center'>
            <Row className='justify-content-center mt-3 w-50'>
                {table.map(item => (
                    <Record
                        key={item.no}
                        date={item.effectiveDate}
                        record={item.mid}/>
                ))}
            </Row>
        </Container>
    )
}
export default CurrencyList;