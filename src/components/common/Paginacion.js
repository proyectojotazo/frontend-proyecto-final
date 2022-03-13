import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./paginacion.scss";

function Paginacion({ paginaAtras, paginaSig }) {
  return (
    <div className="pagination-box">
      <ul>
        <li onClick={() => paginaAtras()}>
          <FaChevronLeft className="icon-pag"/>
          <p className="paginacionPalabra">Página anterior</p>
        </li>
        <li onClick={() => paginaSig()}>
          <p className="paginacionPalabra">Página siguiente</p>
          <FaChevronRight className="icon-pag"/>
        </li>
      </ul>
    </div>
  );
}

export default Paginacion;
