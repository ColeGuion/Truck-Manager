import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);
    return (
        <h1>Oops, an error occured!</h1>
    );
}

export default ErrorBoundary;