/*-------------------------------------------------------------------------
    Import dependencies
-------------------------------------------------------------------------*/
import { useRouteError } from "react-router-dom";

/*-------------------------------------------------------------------------
    Error component which is displayed by the browser router when an
    error is thrown
-------------------------------------------------------------------------*/
function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);
    return (
        <h1>Oops, an error occured!</h1>
    );
}

export default ErrorBoundary;