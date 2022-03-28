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
  const { search, categoria, orden, pagina, cambiarCategoria, ultimaPag } = props;

  useEffect(() => {
    searchArticle(search, categoria, orden, pagina, ultimaPag).then((x) => {
      if (x.length === 0) return ultimaPag();
      setArticulos(x);
    });
  }, [search, categoria, orden, pagina, ultimaPag]);

  console.log(articulos.length);
  return (
    <section className="seccionArticulos">
      {articulos.length !== 0 ?
        (articulos.map((articulo) => (
          <div key={articulo._id} className="card__wrapper">
            <Card
              articulo={articulo}
              cambiarCategoria={cambiarCategoria}
            />
            <UserInfo user={articulo.usuario[0]} />
          </div>
        ))
        ) : (
          <div className="not-found">
            <p className="error-text" > {t("main.articulosFound.notFound")}
            </p>
          </div>
        )}
    </section>
  );
}

export default ArticulosFound;
