import React from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import "./paginacion.scss";

function Paginacion({ paginaAtras, paginaSig }) {
  return (
    <div className="pagination-box">
      <ul>
        <li onClick={() => paginaAtras()}>
          <FcPrevious />
          Página anterior
        </li>
        <li onClick={() => paginaSig()}>
          Página siguiente
          <FcNext />
        </li>
      </ul>
    </div>
  );
}

export default Paginacion;
