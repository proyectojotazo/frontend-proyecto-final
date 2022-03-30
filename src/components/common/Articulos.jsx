import Card from './Card';
import UserInfo from './UserInfo';
import EmptyArticlesMsg from './EmptyArticlesMsg';

import '../common/articulos.scss';
import Spinner from './Spinner';
import useArticlesFetched from './../../hooks/useArticlesFetched';
import ErrorMsg from './ErrorMsg';

function Articulos(props) {
    const { cambiarCategoria, categoria } = props;
    const { articulos, isLoading, error } = useArticlesFetched(props);

    if (isLoading) return <Spinner />;

    if (error.active) return <ErrorMsg msg={error.message} />;

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
