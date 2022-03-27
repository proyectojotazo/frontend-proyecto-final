import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./paginacion.scss";

function Paginacion({ paginaAtras, paginaSig, order }) {
  return (
    <div className="pagination-box">
      <ul>
        <li onClick={() => paginaAtras()}>
          <FaChevronLeft className="icon-pag" />
          <p className="paginacionPalabra">Página anterior</p>
        </li>
        <li onClick={() => paginaSig()}>
          <p className="paginacionPalabra">Página siguiente</p>
          <FaChevronRight className="icon-pag" />
        </li>
        <li>
          <select
            className="order-select"
            defaultValue="-fechaPublicacion"
            onChange={(e) => order(e.target.value)}
          >
            <option value="fechaPublicacion">Más antiguos</option>
            <option value="-fechaPublicacion">Más recientes</option>
            <option value="titulo">Por título: A-Z</option>
            <option value="-titulo">Por título: Z-A</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default Paginacion;
