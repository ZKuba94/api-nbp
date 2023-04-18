import React from "react";
import {Button} from "react-bootstrap";

function Record({id, date, record}) {
    const handleCopyClick = () => {navigator.clipboard.writeText(record)}
    return (
        <li className='list-unstyled m-1'>
            {id} |&nbsp;
            {date} |&nbsp;
            <span style={{fontWeight: 'bold'}}>{record}</span> |&nbsp;
            <Button
                onClick={handleCopyClick}
                className="d-inline"
                variant="outline-light"
                size="sm"
            >
                copy
            </Button>
        </li>
    )
}

export default Record;