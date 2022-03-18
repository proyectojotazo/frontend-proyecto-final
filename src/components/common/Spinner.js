import './Spinner.scss';

// TODO: Arreglarlo un poco?
function Spinner() {
    return (
        <div className="spinner__container">
            <div className="lds-ellipsis">
                Cargando...
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Spinner;
