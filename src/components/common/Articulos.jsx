import { useEffect, useState } from 'react';

import { getArticulosCategorias } from '../../api/services/articulos';

import Card from './Card';
import UserInfo from './UserInfo';
import EmptyArticlesMsg from './EmptyArticlesMsg';

import '../common/articulos.scss';

function Articulos(props) {
    const [articulos, setArticulos] = useState([]);
    const {
        categoria,
        orden,
        pagina,
        cambiarCategoria,
        ultimaPag,
        handleArticles,
    } = props;

    useEffect(() => {
        getArticulosCategorias(categoria, orden, pagina).then((articles) => {
            if (articles.length === 0 && pagina !== 0) {
                return ultimaPag();
            }
            setArticulos(articles);
            handleArticles(!!articles.length);
        });
    }, [categoria, orden, pagina, ultimaPag, handleArticles]);

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
                <EmptyArticlesMsg categoria={categoria} />
            )}
        </>
    );
}

export default Articulos;
