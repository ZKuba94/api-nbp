import {Alert} from "react-bootstrap";
import PropTypes from "prop-types";

function ErrorHandler({errorMessage, errorVariant}) {
    return (
        <>
            <Alert
                variant={errorVariant}
                className='my-3'
            >
                {errorMessage}
            </Alert>
        </>
    )
}

export default ErrorHandler;

ErrorHandler.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    errorVariant: PropTypes.string.isRequired,
}