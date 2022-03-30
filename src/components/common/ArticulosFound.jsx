import React from 'react';
import { useEffect, useState } from 'react';
import { searchArticle } from '../../api/services/articulos';
import Card from './Card';
import NotFoundList from './NotFoundList';


import '../common/articulos.scss';
import UserInfo from './UserInfo';
import Spinner from './Spinner';


function ArticulosFound(props) {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    search,
    categoria,
    orden,
    pagina,
    cambiarCategoria,
    ultimaPag,
    hasSearch,
  } = props;

  useEffect(() => {
    searchArticle(search, categoria, orden, pagina, ultimaPag).then((art) => {
      if (art.length === 0 && pagina !== 0) {
        return ultimaPag();
      }
      setArticulos(art);
      hasSearch(!!art.length);
    })
      .catch((error) => console.log(error))
      .finally(setLoading(false));
  }, [search, categoria, orden, pagina, ultimaPag, hasSearch]);

  return (
    <>
      {loading && <Spinner />}
      {articulos.length !== 0 ? (
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
      ) : (
        <NotFoundList />
      )}
    </>
  );
}

export default ArticulosFound;
