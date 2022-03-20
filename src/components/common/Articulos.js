import React from "react";
import { useEffect, useState } from "react";
import { getArticulosCategorias } from "../../api/services/articulos";
import Card from "./Card";

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
      {articulos.map(( articulo ) => (
        <Card
          key={articulo._id}
          articulo={articulo}
          cambiarCategoria={cambiarCategoria}
        />
      ))}
    </section>
  );
}

export default Articulos;
