import './Spinner.scss'

// TODO: Arreglarlo un poco?
function Spinner() {
  return (
    <div className="lds-ellipsis">
      Loading...
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;
