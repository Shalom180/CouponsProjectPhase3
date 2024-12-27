import "./PageNotFound.css";

export function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <a href="/">Go Back to Homepage</a>
        </div>
    );
}
