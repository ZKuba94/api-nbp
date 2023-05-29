import Record from './Record'
import {useEffect, useState} from "react";
import {ListGroup, Container, Row} from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";

function CurrencyList({actCurrency, actNumber}) {
    const [table, setTable] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`/api/exchangerates/rates/A/${actCurrency}/last/${actNumber}/`);
            setTable(data.rates)
        }
        fetchData()
    }, [actCurrency, actNumber])
    return (
        <Container className='d-flex justify-content-center'>
            <Row className='justify-content-center mt-3 w-50'>
                <ListGroup>
                    {table.map(item => (
                        <Record
                            currencyItem={item}
                            key={item.no}
                        />
                    ))}
                </ListGroup>
            </Row>
        </Container>
    )
}

CurrencyList.propTypes = {
    actCurrency: PropTypes.string.isRequired,
    actNumber: PropTypes.number.isRequired,
}
export default CurrencyList;