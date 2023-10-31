import {Alert} from "react-bootstrap";
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