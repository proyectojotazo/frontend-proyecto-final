import { useState, useEffect } from 'react';
import { getArticulosCategorias } from '../api/services/articulos';

const useArticlesFetched = (props) => {
    const [articulos, setArticulos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({
        message: '',
        active: false,
    });

    const { categoria, orden, pagina, ultimaPag, handleArticles } = props;

    useEffect(() => {
        getArticulosCategorias(categoria, orden, pagina)
            .then((articles) => {
                if (articles.length === 0 && pagina !== 0) {
                    return ultimaPag();
                }
                setArticulos(articles);
                handleArticles(!!articles.length);
            })
            .catch((err) => setError({ message: err.message, active: true }))
            .finally(() => setIsLoading(false));
    }, [categoria, orden, pagina, ultimaPag, handleArticles]);

    return { articulos, isLoading, error };
};

export default useArticlesFetched;
