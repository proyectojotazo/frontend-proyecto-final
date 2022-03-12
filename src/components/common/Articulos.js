import React from "react";
import { useEffect, useState } from "react";
import {
  getArticulos,
  getArticulosCategorias,
} from "../../api/services/articulos";
import Card from "./Card";
import { Link } from "react-router-dom";
import "../common/articulos.scss";

function Articulos(props) {
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
        <Link key={_id} to={`/articles/${_id}`}>
          <Card {...advert} />
        </Link>
      ))}
    </section>
  );
}

export default Articulos;
