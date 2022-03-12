import React from "react";
import { useEffect, useState } from "react";
import {
  getArticulos,
  getArticulosCategorias,
} from "../../api/services/articulos";
import Card from "./Card";
import { Link } from "react-router-dom";
import "../common/articulos.scss";

function Articulos({ categoria, cambiarCategoria }) {
  const [articulos, setArticulos] = useState([]);
  const { categoria, orden, pagina } = props;

  useEffect(() => {
    getArticulosCategorias(categoria, orden, pagina).then((x) => {
      setArticulos(x);
    });
  }, [categoria, orden, pagina]);

  return (
    <section className="seccionArticulos">
      {articulos.map(({ _id, ...advert }) => (
        <Card
          key={_id}
          {...advert}
          id={_id}
          cambiarCategoria={cambiarCategoria}
        />
      ))}
    </section>
  );
}

export default Articulos;
