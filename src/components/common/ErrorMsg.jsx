import './errorMsg.scss';

function ErrorMsg({ msg }) {
    return (
        <div className="wrapper-error">
            <p className="articulo__error">{msg}</p>
        </div>
    );
}

export default ErrorMsg;
