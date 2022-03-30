import './notFound.scss';

function NotFound() {
    return (
        <div className="wrapper">
            <main className="main">
                <p className="message">¡Vaya! Has perdido la página</p>
                <h1 className="error-code">
                    <span>4</span>
                    <span>0</span>
                    <span>4</span>
                </h1>
                <p>
                    Lo siento, esa página que dices que buscas no está aquí 8(
                </p>
                <p className="actions">
                    <a className="button" href="/">
                        &laquo; Volver
                    </a>
                </p>
            </main>
        </div>
    );
}

export default NotFound;
