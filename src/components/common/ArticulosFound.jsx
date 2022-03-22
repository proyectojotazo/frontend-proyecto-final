import React from 'react';
import { useEffect, useState } from 'react';
import { searchArticle } from '../../api/services/articulos';
import Card from './Card';

import '../common/articulos.scss';
import UserInfo from './UserInfo';

function ArticulosFound(props) {
  const [articulos, setArticulos] = useState([]);
  const { search, categoria, orden, pagina, cambiarCategoria, ultimaPag } = props;

  useEffect(() => {
    searchArticle(search, categoria, orden, pagina).then((x) => {
      if (x.length === 0) return ultimaPag();
      setArticulos(x);
    });
  }, [search, categoria, orden, pagina, ultimaPag]);

  return (
    <section className="seccionArticulos">
      {articulos.map((articulo) => (
        <div key={articulo._id} className="card__wrapper">
          <Card
            articulo={articulo}
            cambiarCategoria={cambiarCategoria}
          />
          <UserInfo user={articulo.usuario[0]} />
        </div>
      ))}
    </section>
  );
}

export default ArticulosFound;
