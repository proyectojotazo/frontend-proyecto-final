import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./paginacion.scss";
import { useAuth } from '../../contexts/authContext';

function Paginacion({ paginaAtras, paginaSig, order }) {
  const {t}= useAuth() 
  return (
    <div className="pagination-box">
      <ul>
        <li onClick={() => paginaAtras()}>
          <FaChevronLeft className="icon-pag" />
          <p className="paginacionPalabra">{t("main.paginacion.back")}</p>
        </li>
        <li onClick={() => paginaSig()}>
          <p className="paginacionPalabra">{t("main.paginacion.go")}</p>
          <FaChevronRight className="icon-pag" />
        </li>
        <li>
          <select
            className="order-select"
            defaultValue="-fechaPublicacion"
            onChange={(e) => order(e.target.value)}
          >
            <option value="fechaPublicacion">{t("main.paginacion.old")}</option>
            <option value="-fechaPublicacion">{t("main.paginacion.recent")}</option>
            <option value="titulo">{t("main.paginacion.orderAZ")}</option>
            <option value="-titulo">{t("main.paginacion.orderZA")}</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default Paginacion;
