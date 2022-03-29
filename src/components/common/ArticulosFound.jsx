import React from 'react';
import { useEffect, useState } from 'react';
import { searchArticle } from '../../api/services/articulos';
import Card from './Card';


import '../common/articulos.scss';
import UserInfo from './UserInfo';
import { useAuth } from '../../contexts/authContext';


function ArticulosFound(props) {
  const [articulos, setArticulos] = useState([]);
  const { t } = useAuth();
  const {
    search,
    categoria,
    orden,
    pagina,
    cambiarCategoria,
    ultimaPag,
    hasSearch,
  } = props;


  console.log(articulos)
  const NotFoundList = () => (
    <div className="not-found">
      <p className="error-text" > {t("main.articulosFound.notFound")}
      </p>
    </div>
  );

  useEffect(() => {
    searchArticle(search, categoria, orden, pagina, ultimaPag).then((art) => {
      if (art.length === 0 && pagina !== 0) {
        return ultimaPag();
      }
      setArticulos(art);
      hasSearch(!!art.length);
    });
  }, [search, categoria, orden, pagina, ultimaPag, hasSearch]);

  return (
    <>
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
