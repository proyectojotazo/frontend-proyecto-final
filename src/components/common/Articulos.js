import React from 'react';
import { useEffect, useState } from 'react';
import {
  getArticulos,
  getArticulosCategorias,
} from '../../api/services/articulos';
import Card from './Card';
import { Link } from 'react-router-dom';
import '../common/articulos.scss';

function Articulos({categoria, cambiarCategoria}) {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    if (categoria) {
      getArticulosCategorias(categoria).then((x) => {
        setArticulos(x);
      });
    } else {
      getArticulos().then((x) => {
        setArticulos(x);
      });
    }
  }, [categoria]);

  return (
    <section className="seccionArticulos">
      {articulos.map(({ _id, ...advert }) => (
          <Card  key={_id} {...advert} id={_id} cambiarCategoria={cambiarCategoria}/>
      ))}
    </section>
  );
}

export default Articulos;

