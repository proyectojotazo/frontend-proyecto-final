import React from "react";

function Paginacion({ paginaAtras, paginaSig }) {
  return (
    <div>
      <ul>
        <li onClick={() => paginaAtras()}>Página anterior</li>
        <li onClick={() => paginaSig()}>Página siguiente</li>
      </ul>
    </div>
  );
}

export default Paginacion;
