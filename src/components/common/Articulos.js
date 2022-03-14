import React from "react";
import { useEffect, useState } from "react";
import { getArticulosCategorias } from "../../api/services/articulos";
import Card from "./Card";
import { Link } from "react-router-dom";
import "../common/articulos.scss";

function Articulos(props) {
  const [articulos, setArticulos] = useState([]);
  const { categoria, orden, pagina, cambiarCategoria, ultimaPag } = props;

  useEffect(() => {
    getArticulosCategorias(categoria, orden, pagina).then((x) => {
      if (x.length === 0) return ultimaPag();
      setArticulos(x);
    });
  }, [categoria, orden, pagina, ultimaPag]);

  return (
    <section className="seccionArticulos">
      {articulos.map(( advert ) => (
        <Card
          key={advert._id}
          advert={advert}
          cambiarCategoria={cambiarCategoria}
        />
      ))}
    </section>
  );
}

export default Articulos;
