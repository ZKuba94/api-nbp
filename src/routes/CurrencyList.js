import Record from './Record'
import {useEffect, useState} from "react";
import {ListGroup, Container, Row, Spinner} from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

function CurrencyList({actCurrency, actNumber, onErrorChange, onErrorVariantChange}) {
    const [table, setTable] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const debounceFetch = () => {
        const fetchData = async () => {
            try {
                console.log(actNumber)
                setLoading(true)
                const {data} = await axios.get(
                    `/api/exchangerates/rates/A/${actCurrency}/last/${actNumber}/`
                );
                setTable(data.rates);
            } catch (error) {
                // onErrorChange(`Your request is out of range, please choose number 1-255. ${error.message}`)
                onErrorChange(`Please insert number in range 1-255.`)
                onErrorVariantChange('danger')
                navigate(`/${actCurrency}`)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }
    useEffect(() => {
        const timer = setTimeout(debounceFetch, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [actCurrency, actNumber, navigate]);
    return (
        <Container className='d-flex justify-content-center'>
            <Row className='justify-content-center mt-3 w-50'>
                {loading && <Spinner animation="border"/>}
                <ListGroup style={{minWidth: '240px'}}>
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
    onErrorChange: PropTypes.func.isRequired,
    onErrorVariantChange: PropTypes.func.isRequired,
}
export default CurrencyList;