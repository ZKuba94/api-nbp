import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Record from './Record'
import {useEffect, useState} from "react";
import axios from "axios";
function CurrencyList({actCurrency, number}) {
    const [table,setTable] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`/api/exchangerates/rates/A/${actCurrency}/last/${number}/`);
            setTable(data.rates)
        }
        fetchData()
    }, [actCurrency,number])
    return (
        <Container className='d-flex justify-content-center'>
            <Row className='justify-content-center mt-3 w-50'>
                {table.map(item => (
                    <Record
                        id={item.no}
                        date={item.effectiveDate}
                        record={item.mid}/>
                ))}
            </Row>
        </Container>
    )
}
export default CurrencyList;