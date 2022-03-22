import './Spinner.scss';

// TODO: Arreglarlo un poco?
function Spinner() {
    return (
        <div className="spinner__container">
            <p className="spinner__loading-msg">...Cargando...</p>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Spinner;
