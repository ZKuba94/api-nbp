import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Record from './Record'
import {useEffect} from "react";
import {useState} from "react";

function CurrencyList({actCurrency, number}) {
    const [table,setTable] = useState([])
    console.log(table)
    useEffect(() => {
        fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${actCurrency}/last/${number}/`)
            .then(data => data.json()).then(list => setTable(list.rates))
    }, [])
    return (
        <Container className='d-flex justify-content-center'>
            <Row className='justify-content-center mt-3 w-50'>
                {table.map(item => (
                    <Record
                        date={item.effectiveDate}
                        record={item.mid}/>
                ))}
            </Row>
        </Container>
    )
}
export default CurrencyList;