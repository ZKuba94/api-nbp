import React, {useState} from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";

function Record({currencyItem}) {
    const {mid,effectiveDate,no} = currencyItem
    const [copied,setCopied] = useState(false)
    const handleCopyClick = () => {
        navigator.clipboard.writeText(mid)
        setCopied(true)
        setTimeout(()=> setCopied(false),1500)
    }
    return (
        <li className='list-unstyled m-1'>
            {no} |&nbsp;
            {effectiveDate} |&nbsp;
            <span style={{fontWeight: 'bold'}}>{mid}</span> |&nbsp;
            <Button
                onClick={handleCopyClick}
                className="d-inline"
                variant={copied?"success":"outline-light"}
                size="sm"
            >
                copy
            </Button>
        </li>
    )
}
Record.propTypes = {
    currencyItem: PropTypes.shape({
        mid: PropTypes.number.isRequired,
        effectiveDate: PropTypes.string.isRequired,
        no: PropTypes.string.isRequired,
    }).isRequired,
}
export default Record;
